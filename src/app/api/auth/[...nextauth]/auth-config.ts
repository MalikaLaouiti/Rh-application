import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/server/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts"; // Secure password comparison

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/Error',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
              

        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("User found in database:", user);

        if (!user) {
          console.error("No user found with the provided email");
          throw new Error("No user found");
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          console.error("Invalid password");
          throw new Error("Invalid password");
        }
        console.log("Authorize function - credentials:", credentials);
        console.log("Authorize function - user:", user);  
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.grade,
          cin: user.cin,
        };
        
      },
      

    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
    
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.cin = (user as any).cin;
      }

      if (token.sub) {
        const freshUser = await prisma.user.findUnique({
          where: { id: Number(token.sub) },
        });

        if (freshUser) {
          token.role = freshUser.grade;
          token.cin = freshUser.cin;
        }
      }
      console.log("JWT callback - Token:", token);      
      return token;
    },

    async session({ session, token }) {
      
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.cin = token.cin as string;
      }
      console.log("Session callback - Session:", session);      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
