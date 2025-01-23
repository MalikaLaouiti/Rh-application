"use client";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Perform sign out
      await signOut({ 
        redirect: false // Prevent automatic redirection
      });
      
      // Show success toast
      toast.success("Déconnexion réussie !");
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      toast.error("Échec de la déconnexion.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10">
      <div className="space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Déconnexion</h2>
        
        <p className="text-center mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
        
        <Button 
          onClick={handleSignOut} 
          className="w-full"
        >
          Confirmer la déconnexion
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          Retour à{" "}
          <Link 
            href="/login" 
            className="font-medium underline underline-offset-4 hover:text-primary" 
            prefetch={false}
          >
            Page de connexion
          </Link>
        </div>
        
        <ToastContainer />
      </div>
    </div>
  );
}