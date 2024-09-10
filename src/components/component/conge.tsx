"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"


export default function conge() {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Demandes de congé</h1>
          <p className="text-muted-foreground">Soumettez votre demande de congé et suivez son état.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle demande de congé</CardTitle>
            <CardDescription>Remplissez le formulaire ci-dessous pour soumettre votre demande.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Date de début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal">
                      Choisir une date
                      <div className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">Date de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal">
                      Choisir une date
                      <div className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Motif du congé</Label>
              <Textarea id="reason" placeholder="Expliquez la raison de votre demande" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Soumettre la demande</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suivi des demandes</CardTitle>
            <CardDescription>Consultez l'état de vos demandes de congé.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-[25px_1fr_100px] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <span className="flex h-2 w-2 rounded-full bg-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Congé du 15 au 20 juin</p>
                  <p className="text-sm text-muted-foreground">Motif: Vacances</p>
                </div>
                <p className="text-sm font-medium text-yellow-500">En attente</p>
              </div>
              <div className="grid grid-cols-[25px_1fr_100px] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium">Congé du 1er au 5 juillet</p>
                  <p className="text-sm text-muted-foreground">Motif: Formation</p>
                </div>
                <p className="text-sm font-medium text-green-500">Approuvée</p>
              </div>
              <div className="grid grid-cols-[25px_1fr_100px] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <span className="flex h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <p className="text-sm font-medium">Congé du 10 au 15 août</p>
                  <p className="text-sm text-muted-foreground">Motif: Urgence familiale</p>
                </div>
                <p className="text-sm font-medium text-red-500">Rejetée</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
