import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function accounts() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="sm:hidden">
              <div className="h-5 w-5" />
              <span className="sr-only">Basculer le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                prefetch={false}
              >
                <div className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Employés</span>
              </Link>
              <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                <div className="h-5 w-5" />
                Employés
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  Tableau de bord
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Employés</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher des employés..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <Button size="sm" className="ml-auto">
          <div className="h-4 w-4 mr-2" />
          Ajouter un employé
        </Button>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Poste</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">John Doe</TableCell>
                <TableCell>Ingénieur logiciel</TableCell>
                <TableCell>Ingénierie</TableCell>
                <TableCell>+1 (555) 123-4567</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Voir</span>
                  </Button>
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Jane Smith</TableCell>
                <TableCell>Gestionnaire de produits</TableCell>
                <TableCell>Produits</TableCell>
                <TableCell>+1 (555) 987-6543</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Voir</span>
                  </Button>
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bob Johnson</TableCell>
                <TableCell>Représentant des ventes</TableCell>
                <TableCell>Ventes</TableCell>
                <TableCell>+1 (555) 456-7890</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Voir</span>
                  </Button>
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                  <Button variant="outline" size="sm" className="mr-2">
                    <div className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
