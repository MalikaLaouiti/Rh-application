import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDaysIcon } from "@/components/ui/calendar-icon"

export default function Rest() {
  return (
    <div className="bg-background text-foreground rounded-lg border p-6 w-full max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Congé de maladie</CardTitle>
              <CardDescription>Consultez et demandez des jours de congé de maladie.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        <span>Sélectionnez une date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        <span>Sélectionnez une date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-4">
                <Button size="lg" className="w-full">
                  Demander un congé de maladie
                </Button>
                <Button size="lg" className="w-full">
                  Consulter les demandes de congé
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Solde de congé de maladie</CardTitle>
              <CardDescription>Consultez vos congés de maladie restants.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Congé de maladie restant</div>
                <div className="text-2xl font-bold">12 jours</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Congé de maladie utilisé</div>
                <div className="text-2xl font-bold">3 jours</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Temps de repos</CardTitle>
              <CardDescription>Consultez et demandez du temps de repos.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        <span>Sélectionnez une date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        <span>Sélectionnez une date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-4">
                <Button size="lg" className="w-full">
                  Demander du temps de repos
                </Button>
                <Button size="lg" className="w-full">
                  Consulter les demandes de temps de repos
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Solde de temps de repos</CardTitle>
              <CardDescription>Consultez votre temps de repos restant.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Temps de repos restant</div>
                <div className="text-2xl font-bold">10 jours</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Temps de repos utilisé</div>
                <div className="text-2xl font-bold">2 jours</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
