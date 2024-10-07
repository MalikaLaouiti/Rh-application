import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt-ts"
import { redirect } from "next/navigation"

// Your own logic for dealing with plaintext password strings; be careful!

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to verify if the user exists
        user = await prisma.user.findUnique({
          where: { email : credentials.email as string },
        })
 
        if (!user) {
          redirect('/Admin/Formulaire');
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration 
        }
        if (await compare(credentials.password as string, user.password as string)){
          // if (user.grade ==='Admin'){
          //   redirect('/Admin/Administration');
          // }
          // else {
          //   redirect('/User/Account');
          // } 
          return user;
        }
        else {
          throw new Error("Invalid password.")
        }
      },
    }),
  ],
})