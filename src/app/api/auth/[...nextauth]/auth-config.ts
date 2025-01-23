import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/server/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts"; // Secure password comparison
import { se } from "date-fns/locale";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Use JWT-based sessions
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
        password: { label: "Password", type: "password" },
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

        // Securely compare passwords using bcrypt
        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          console.error("Invalid password");
          throw new Error("Invalid password");
        }

        // Return user details for session token
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.grade, // or user.role if using role instead of grade
          cin: user.cin,
          updatedAt: Date.now()
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      console.log("JWT callback - Token before:", token, "User:", user);

      // Regenerate token with the latest data from DB if user exists
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.cin = user.cin; 
        updatedAt: Date.now()// Ensure CIN is included in the token
      }

      // If the user has already logged in, ensure the token is updated with fresh data
      if (token.sub) {
        const freshUser = await prisma.user.findUnique({
          where: { id: Number(token.sub) },
        });

        if (freshUser) {
          token.role = freshUser.grade; // Or use freshUser.role if applicable
          token.cin = freshUser.cin;
        }
      }

      console.log("JWT callback - Token after:", token);
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      console.log("Session callback - Session:", session, "Token:", token);

      // Add token data to the session object
      if (session?.user) {
        session.user.role = token.role; // Add role from token
        session.user.id = token.id;     // Add user ID from token
        session.user.cin = token.cin; // Add CIN from token
        updatedAt: Date.now()  
      }

      console.log("Session callback - Session after:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
