"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toast } from "@/components/ui/toast"
import { AlertCircle, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Ici, vous implémenteriez la logique réelle de réinitialisation du mot de passe
    // Pour cet exemple, nous allons simuler une requête asynchrone
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simule une requête API
      Toast({
        title: "Demande envoyée",
        description: "Si un compte existe avec cette adresse e-mail, vous recevrez bientôt un lien de réinitialisation.",
      })
      setEmail("")
    } catch (error) {
      Toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Réinitialisation du mot de passe</CardTitle>
          <CardDescription className="text-center">
            Entrez votre adresse e-mail pour recevoir un lien de réinitialisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Envoi en cours...</>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer le lien de réinitialisation
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-gray-500 text-center">
            <AlertCircle className="inline-block mr-1 h-4 w-4" />
            Si vous ne recevez pas d'e-mail, vérifiez votre dossier spam.
          </div>
          <Link href="/Login" className="text-sm text-primary hover:underline flex items-center justify-center">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Retour à la page de connexion
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}