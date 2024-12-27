import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/server/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { se } from "date-fns/locale";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login', // Custom sign-in page
    error: '/Error', // Error code passed in query string as ?error=
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        cin: { label: "CIN", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
      
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          throw new Error("Missing credentials");
        }
      
        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        console.log("User found in database:", user);
      
        if (!user) {
          console.error("No user found with the provided email");
          throw new Error("No user found");
        }
      
        // Directly compare plain-text passwords (TEMPORARY FOR TESTING)
        if (credentials.password !== user.password) {
          console.error("Invalid password");
          throw new Error("Invalid password");
        }
      
        // Return user details for session token
        return {
          id: user.id.toString(),
          cin: user.cin,
          email: user.email,
          name: user.name,
          role: user.grade, // or user.role if using role instead of grade
        };
      }      
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      console.log("JWT callback - Token:", token, "User:", user);
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log("Session callback - Session:", session, "Token:", token);
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.cin = token.cin;
      }
      return session;
    },
    
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
