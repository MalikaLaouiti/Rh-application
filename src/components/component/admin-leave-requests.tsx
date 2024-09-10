"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import  {Badge}  from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckIcon, XIcon, EyeIcon, FileIcon, DownloadIcon } from "lucide-react"
import {Toast}  from "@/components/ui/toast"

// Exemple de données pour les demandes de congé
const leaveRequests = [
  { id: 1, employee: "Alice Dubois", startDate: "2023-07-01", endDate: "2023-07-10", reason: "Vacances d'été", status: "En attente" },
  { id: 2, employee: "Bob Martin", startDate: "2023-08-15", endDate: "2023-08-20", reason: "Mariage", status: "Approuvé" },
  { id: 3, employee: "Claire Lefebvre", startDate: "2023-09-05", endDate: "2023-09-07", reason: "Rendez-vous médical", status: "En attente" },
]

// Exemple de données pour les documents exportés
const exportedDocuments = [
  { id: 1, name: "Rapport_Annuel_2022.pdf", date: "2023-06-30", type: "Rapport", content: "Contenu du rapport annuel 2022..." },
  { id: 2, name: "Liste_Employés_Juin2023.xlsx", date: "2023-07-01", type: "Liste", content: "Liste des employés mise à jour en juin 2023..." },
  { id: 3, name: "Contrats_Nouveaux_Employés_Q2.zip", date: "2023-07-15", type: "Contrats", content: "Contrats des nouveaux employés pour le deuxième trimestre..." },
]

export default function Request() {
  const [requests, setRequests] = useState(leaveRequests)
  const [selectedDocument, setSelectedDocument] = useState<typeof exportedDocuments[0] | null>(null)

  const handleApprove = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Approuvé" } : req
    ))
    Toast({
      title: "Demande approuvée",
      description: "La demande de congé a été approuvée avec succès.",
    })
  }

  const handleReject = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Refusé" } : req
    ))
    Toast({
      title: "Demande refusée",
      description: "La demande de congé a été refusée.",
    })
  }

  const handleDownload = (doc: typeof exportedDocuments[0]) => {
    // Simuler le téléchargement
    Toast({
      title: "Téléchargement commencé",
      description: `Le document ${doc.name} est en cours de téléchargement.`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Administration RH</CardTitle>
        <CardDescription>Gérez les demandes de congé et consultez les documents exportés.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="leave-requests" >
          <TabsList >
            <div className="bg-slate-200 rounded ">
            <TabsTrigger value="leave-requests" className="hover:bg-slate-50 focus:bg-slate-50 rounded-sm transition-transform transform hover:scale-85 focus:scale-90">Demandes de congé</TabsTrigger>
            <TabsTrigger value="exported-documents" className="hover:bg-slate-50 focus:bg-slate-50 rounded-sm transition-transform transform hover:scale-85 focus:scale-90">Documents exportés</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="leave-requests">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead>Date de fin</TableHead>
                  <TableHead>Raison</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employee}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={request.status === "Approuvé" ? "success" : 
                                request.status === "Refusé" ? "destructive" : "default"}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(request.id)}
                          disabled={request.status !== "En attente"}
                          className="bg-green-700"
                        >
                          <CheckIcon className="h-4 w-4 bg-green-700" />
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleReject(request.id)}
                          disabled={request.status !== "En attente"}
                          className="bg-red-700"
                        >
                          <XIcon className="h-4 w-4 bg-red-700" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Détails de la demande de congé</DialogTitle>
                              <DialogDescription>
                                Informations détaillées sur la demande de {request.employee}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                              <p><strong>Employé:</strong> {request.employee}</p>
                              <p><strong>Date de début:</strong> {request.startDate}</p>
                              <p><strong>Date de fin:</strong> {request.endDate}</p>
                              <p><strong>Raison:</strong> {request.reason}</p>
                              <p><strong>Statut:</strong> {request.status}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="exported-documents">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du document</TableHead>
                  <TableHead>Date d'export</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exportedDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="bg-gray-200">
                              <EyeIcon className="h-4 w-4 mr-2" />
                              Visualiser
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{doc.name}</DialogTitle>
                              <DialogDescription>
                                Aperçu du contenu du document
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-muted rounded-md">
                              <p>{doc.content}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}