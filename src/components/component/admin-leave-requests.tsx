"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, XIcon, EyeIcon, FileIcon, DownloadIcon } from "lucide-react";
import { toast } from "react-toastify";
import { getAllLeaveRequests, updateLeaveRequest } from "@/action/conge";

// Types
interface LeaveRequest {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string | null;
  requestedBy?: {
    name: string | null;
    department: string | null;
  } | null;
}

interface ExportedDocument {
  id: number;
  name: string;
  date: string;
  type: string;
  content: string;
}

export default function Request() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<ExportedDocument | null>(null);

  // Sample exported documents (you can replace this with actual data from your backend)
  const exportedDocuments = [
    { id: 1, name: "Rapport_Annuel_2022.pdf", date: "2023-06-30", type: "Rapport", content: "Contenu du rapport annuel 2022..." },
    { id: 2, name: "Liste_Employés_Juin2023.xlsx", date: "2023-07-01", type: "Liste", content: "Liste des employés mise à jour en juin 2023..." },
    { id: 3, name: "Contrats_Nouveaux_Employés_Q2.zip", date: "2023-07-15", type: "Contrats", content: "Contrats des nouveaux employés pour le deuxième trimestre..." },
  ];

  // Fetch leave requests
  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const data = await getAllLeaveRequests();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch leave requests:", error);
      toast.error("Erreur lors du chargement des demandes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle request approval
  const handleApprove = async (id: string) => {
    try {
      const updateData = {
        status: 'Approuvée'
      };
      
      await updateLeaveRequest(id, updateData);
      await fetchRequests(); // Refresh the list
      toast.success("Demande approuvée avec succès");
    } catch (error) {
      console.error("Failed to approve request:", error);
      toast.error("Erreur lors de l'approbation de la demande");
    }
  };

  // Handle request rejection
  const handleReject = async (id: string) => {
    try {
      const updateData = {
        status: 'Rejetée'
      };
      
      await updateLeaveRequest(id, updateData);
      await fetchRequests(); // Refresh the list
      toast.success("Demande rejetée avec succès");
    } catch (error) {
      console.error("Failed to reject request:", error);
      toast.error("Erreur lors du rejet de la demande");
    }
  };

  const handleDownload = (doc: ExportedDocument) => {
    // Implement your document download logic here
    toast.info(`Téléchargement de ${doc.name} commencé`);
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Approuvée":
        return "success";
      case "Rejetée":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Administration RH</CardTitle>
        <CardDescription>Gérez les demandes de congé et consultez les documents exportés.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="leave-requests">
          <TabsList>
            <div className="bg-slate-200 rounded">
              <TabsTrigger 
                value="leave-requests" 
                className="hover:bg-slate-50 focus:bg-slate-50 rounded-sm transition-transform transform hover:scale-85 focus:scale-90"
              >
                Demandes de congé
              </TabsTrigger>
              <TabsTrigger 
                value="exported-documents" 
                className="hover:bg-slate-50 focus:bg-slate-50 rounded-sm transition-transform transform hover:scale-85 focus:scale-90"
              >
                Documents exportés
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="leave-requests">
            {isLoading ? (
              <div className="text-center py-4">Chargement des demandes...</div>
            ) : (
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
                      <TableCell>{request.requestedBy?.name}</TableCell>
                      <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(request.status ?? "default")}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleApprove(request.id)}
                            disabled={request.status !== "En attente"}
                            className="bg-green-500"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleReject(request.id)}
                            disabled={request.status !== "En attente"}
                            className="bg-red-500"
                          >
                            <XIcon className="h-4 w-4" />
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
                                  Informations détaillées sur la demande de {request.requestedBy?.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2">
                                <p><strong>Employé:</strong> {request.requestedBy?.name}</p>
                                <p><strong>Département:</strong> {request.requestedBy?.department}</p>
                                <p><strong>Date de début:</strong> {new Date(request.startDate).toLocaleDateString()}</p>
                                <p><strong>Date de fin:</strong> {new Date(request.endDate).toLocaleDateString()}</p>
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
            )}
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
                              <DialogDescription>Aperçu du contenu du document</DialogDescription>
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
  );
}