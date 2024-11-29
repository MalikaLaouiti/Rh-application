"use client"
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
          <h1 className="text-3xl font-bold">Bienvenue !</h1>
          <p className="text-muted-foreground">
              Entrez vos donnes pour acceder à votre compte
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
                required: "Entrez votre email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Entrez un email correct",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Entrez votre email"
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
                required: "Entrez votre mot de passe",
                minLength: {
                  value: 5,
                  message: "mot de passe doit contenir plus que 5 caractères",
                },
                pattern: {
                  value: /^[A-Z0-9._%+*/!?-]+/,
                  message: "Entrez un mot de passe fort",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Entrez votre mot de passe"
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
              Mot de passe oublié?
            </Link>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground">
          Vous n'avez pas de compte ?{" "}
          <Link
            href="/sign-up"
            className="font-medium underline underline-offset-4 hover:text-primary"
            prefetch={false}
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
