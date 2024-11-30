import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, FileTextIcon, UserPlusIcon, UsersIcon, SettingsIcon, ClipboardListIcon } from "lucide-react"
import { prisma } from '@/server/prisma';



export default async function Dash() {
  const userCount = await prisma.user.count();
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <header className="flex items-center h-16 px-4 border-b bg-white shrink-0 md:px-6">
        <h1 className="text-lg font-semibold">Tableau de bord RH Admin</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="employees">Employés</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="admin">Administration</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employés</CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userCount}</div>
                  
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents Traités</CardTitle>
                  <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">450</div>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tâches en Attente</CardTitle>
                  <ClipboardListIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">À traiter</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Employés</CardTitle>
                <CardDescription>Ajoutez, modifiez ou supprimez des informations sur les employés.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
              <div className="flex justify-center">
                <a href="/Admin/Formulaire" className="no-underline">
                  <Button className="mr-2">
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Ajouter un Employé
                  </Button>
                </a>
                <a href="/Admin/Liste" className="no-underline">
                  <Button variant="outline">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Liste des Employés
                  </Button>
                </a>
              </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Documents</CardTitle>
                <CardDescription>Gérez les documents administratifs et les exports.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-center">
                <a href="/Admin/Document" className="no-underline">
                <Button className="mr-2">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Nouveau Document
                </Button>
                </a>
                <a href="/Admin/Archif" className="no-underline">
                <Button variant="outline">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Exporter les Données
                </Button>
                </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="admin" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tâches Administratives</CardTitle>
                <CardDescription>Gérez les paramètres et effectuez des tâches administratives.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
              <div className="flex justify-center">
              <a href="/Admin/Administration" className="no-underline">
                <Button className="mr-2">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Paramètres du Système
                </Button>
              </a>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Planification
                </Button>
              </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}