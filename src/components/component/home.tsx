"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="container space-y-10 xl:space-y-16 px-4 md:px-6">
            <div className="grid max-w-[1300px] mx-auto gap-4 sm:gap-16 md:grid-cols-2">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Optimisez la gestion de vos ressources humaines
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-10">
                  Notre application de gestion des ressources humaines vous offre une solution complète pour simplifier
                  vos processus RH, de l'intégration des employés au suivi des performances.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src="Ressource.jpg"
                  width="600"
                  height="400"
                  alt="Gestion des ressources humaines"
                  className="mx-auto aspect-[3/2] overflow-hidden rounded-t-xl object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container space-y-12 px-4 md:px-6 ">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Fonctionnalités clés</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Optimisez vos processus RH</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-10">
                  Notre application de gestion des ressources humaines vous offre une gamme de fonctionnalités pour vous
                  aider à gérer votre personnel de manière plus efficace, de l\'intégration des employés au suivi des
                  performances.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Intégration des employés</h3>
                <p className="text-sm text-muted-foreground">
                  Simplifiez votre processus d\'intégration avec des workflows automatisés et la signature électronique
                  de documents.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Temps et présence</h3>
                <p className="text-sm text-muted-foreground">
                  Suivez facilement la présence des employés et gérez les demandes de congés.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Gestion des performances</h3>
                <p className="text-sm text-muted-foreground">
                  Définissez des objectifs clairs, suivez les progrès et fournissez des commentaires pour aider votre
                  équipe à atteindre son plein potentiel.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Paie et avantages sociaux</h3>
                <p className="text-sm text-muted-foreground">
                  Gérez la paie, les avantages sociaux et la conformité avec facilité.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Rapports et analyses</h3>
                <p className="text-sm text-muted-foreground">
                  Obtenez des informations précieuses sur votre personnel grâce à des rapports et des analyses complets.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Libre-service des employés</h3>
                <p className="text-sm text-muted-foreground">
                  Autonomisez vos employés avec des outils en libre-service pour gérer leurs informations et leurs
                  demandes.
                </p>
              </div>
            </div>
            <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Se connecter
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
