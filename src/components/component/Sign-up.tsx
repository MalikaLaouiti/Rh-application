"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "@/action/employee";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";





export default function signUp() {
  const form = useForm({
    defaultValues: {
      cin: '',
      password: '',
      name: '',
      gender: '',
      phone_number: '',
      email: '',
      grade: ''
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: Record<string, string>) => {
    const formDataToSubmit = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    try {
      await createUser(formDataToSubmit); // Send FormData to createUser
      toast.success("Utilisateur créé avec succès !");
    } catch (error) {
      console.error("Failed to create user:", error);
      toast.error("Échec de la création de l'utilisateur.");
    }

  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Inscription à RH Application</h2>

          <FormField
            control={form.control}
            name="cin"
            rules={{ required: "Entrer votre CIN", pattern: { value: /^\d{8}$/, message: "Entrer correctement votre CIN (8 nombres) " } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIN</FormLabel>
                <FormControl>
                  <Input placeholder="Entrer CIN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Entrer votre Mot de passe", 
              
              minLength: { value: 6, message: "Mot de passe doit etre plus que 5 caracteres" }, 
              pattern: { value: /^[A-Z|a-z|0-9|.|_|%|+|*|/|!|?|-]+/, message: "Entrer mot de passse fort" } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Entrer Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Entrer votre nom et prenom" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Entrer nom et prenom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            rules={{ required: "Selectionner votre sex" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Homme">Homme</SelectItem>
                      <SelectItem value="Femme">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            rules={{ required: "Entrer votre numero de telephone", pattern: { value: /^\d{8}$/, message: "Entrer un correct numero" } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Entrer un numero de telephone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Entrer un E-mail", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Entrer un correct E-mail" } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Entrer un E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            rules={{ required: "Selectionner votre role" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sélectionnez votre rôle</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">S'inscrire</Button>
          <ToastContainer />
          <div className="text-center text-sm text-muted-foreground">
            J'ai un compte{" "}
            <Link href="/login" className="font-medium underline underline-offset-4 hover:text-primary" prefetch={false}>
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
