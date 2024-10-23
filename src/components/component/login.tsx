"sue client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "@/server/auth";

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account.
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-4"
            action={async (formData) => {
              try {
              const data = Object.fromEntries(formData.entries());
              await signIn("credentials", data);
              toast.success("Bienvenu");
              }
              catch(error) {
                console.error("Failed to sign in user:", error);
                toast.error("Échec, vérifiez vos donnés.");
              }
            }}
            method="POST"
          >
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Enter an email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Enter your password",
                maxLength: {
                  value: 8,
                  message: "Password must be less than 8 characters",
                },
                minLength: {
                  value: 5,
                  message: "Password must be more than 5 characters",
                },
                pattern: {
                  value: /^[A-Z0-9._%+*/!?-]+/,
                  message: "Enter a stronger password",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/Login/Reset-MDP"
              className="text-sm font-medium underline underline-offset-4 hover:text-primary"
              prefetch={false}
            >
              Forgot password?
            </Link>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium underline underline-offset-4 hover:text-primary"
            prefetch={false}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
