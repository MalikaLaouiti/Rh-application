"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDaysIcon } from "@/components/ui/calendar-icon"
import { CalendarPlusIcon } from "@/components/ui/calendarPlus"
import { CalendarCheckIcon } from "@/components/ui/calendarCheck"

type SoldeProps = {
  idUser: number;
};

const Solde = () =>  {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center h-16 px-4 border-b border-muted shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base" prefetch={false}>
            <CalendarDaysIcon className="w-6 h-6" />
            <span className="sr-only">Congés</span>
          </Link>
          {/* <Link href="#" className="font-bold" prefetch={false}>
            Tableau de bord
          </Link>*/}
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Mes congés
          </Link> 
          {/* <Link href="#" className="text-muted-foreground" prefetch={false}>
            Demandes
          </Link> */}
        </nav>
        {/* <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="ghost" size="sm" className="rounded-full">
            <img
              src="/placeholder.svg"
              width="32"
              height="32"
              className="rounded-full"
              alt="Avatar"
              style={{ aspectRatio: "32/32", objectFit: "cover" }}
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div> */}
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Solde de congés</CardTitle>
              <CalendarDaysIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25 jours</div>
              <p className="text-xs text-muted-foreground">Restants cette année</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Congés pris</CardTitle>
              <CalendarCheckIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10 jours</div>
              <p className="text-xs text-muted-foreground">Cette année</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Demande de congés</CardTitle>
              <CalendarPlusIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Button variant="outline" size="sm">
                  Faire une demande
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Demandez vos congés</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Solde</TableHead>
                  <TableHead>Pris</TableHead>
                  <TableHead>Demandes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">Développeur</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>30 jours</TableCell>
                  <TableCell>5 jours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Gérer
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">Designer</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>25 jours</TableCell>
                  <TableCell>15 jours</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Gérer
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Bob Smith</p>
                        <p className="text-sm text-muted-foreground">Product Manager</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>20 jours</TableCell>
                  <TableCell>8 jours</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Gérer
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  )
}
export default Solde;