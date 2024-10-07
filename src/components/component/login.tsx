"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/server/auth"


export default function Login() {
    const credentialsAction = (formData: FormData) => {
      signIn("credentials", formData)
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account.</p>
        </div>
        <form className="space-y-4" action={credentialsAction}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your Email" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <Link
                href="/Login/Reset-MDP"
                className="text-sm font-medium underline underline-offset-4 hover:text-primary"
                prefetch={false}
              >
                Forgot password?
              </Link>

            </div>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="Admin" />
            <Label htmlFor="admin">Admin</Label>
            <Checkbox id="Employee" />
            <Label htmlFor="employee">Employee</Label>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        {/* <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="#" className="font-medium underline underline-offset-4 hover:text-primary" prefetch={false}>
            Sign up
          </Link>
        </div> */}
      </div>
    </div>
  );
}
