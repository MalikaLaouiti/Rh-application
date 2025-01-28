"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-toastify/dist/ReactToastify.css';

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      const result = await signIn("credentials", {
        redirect: false, // Disable automatic redirection
        email: values.email,
        password: values.password,
      });
  
      console.log("Login result:", result);
  
      if (result?.error) {
        toast.error("Échec de connexion: " + result.error);
        return;
      }
  
      // If no error, assume login was successful
      toast.success("Bienvenue !");
      window.location.href = result?.url || "/User"; // Specify default redirect
    } catch (error) {
      console.error("Failed to sign in:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Bienvenue !</h1>
          <p className="text-muted-foreground">
            Entrez vos données pour accéder à votre compte
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
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
              className="block text-sm font-medium underline underline-offset-4 hover:text-primary"
            >
              Mot de passe oublié?
            </Link>

            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          Vous n'avez pas de compte?{" "}
          <Link
            href="/sign-up"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            S'inscrire
          </Link>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}