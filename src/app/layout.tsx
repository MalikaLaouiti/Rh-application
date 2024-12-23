import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RHFlex",
  description: "Planning holiday and manage RH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <title>RHFlex</title>
        <meta name="description" content={metadata.description || "Default Title"} />
      </head>
      <body>
        <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-20 flex items-center">
          <Link href="#" className="flex items-center justify-center" prefetch={false}>
            <span className="sr-only">Gestion des ressources humaines</span>
          </Link>
          <img
            src="http://www.isimm.rnu.tn//storage/app/public/coordonnees/May2023/pGmJGgcAUDZCgyHGMGJR.png"
            className="h-16 w-15 rounded-md"
            alt="ISIMM Logo"
          />
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              À propos
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Contact
            </Link>
          </nav>
        </header>
        <main className={inter.className}>
        <Providers >{children}</Providers>
        </main>
      
        <footer className="bg-muted p-6 pl-6 w-full ">
          <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-8 text-sm">
            <div className="grid gap-2">
              <h3 className="font-semibold">L'institut</h3>
              <Link href="http://www.isimm.rnu.tn/public/isimm" prefetch={false}>
                À propos de nous
              </Link>
              <Link href="http://www.isimm.rnu.tn/public/contact" prefetch={false}>
                Contacter nous
              </Link>
            </div>
            <div className="grid gap-2 ml-auto">
              <h3 className="font-semibold">Contact</h3>
              <Link href="http://www.isimm.rnu.tn/public/" prefetch={false}>
                Site Web
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100063489403806" prefetch={false}>
                Facebook
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
