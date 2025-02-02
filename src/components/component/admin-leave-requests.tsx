"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, XIcon, EyeIcon, DownloadIcon } from "lucide-react";
import { toast } from "react-toastify";
import { getAllLeaveRequests, updateLeaveRequest } from "@/action/conge";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import LeaveRequestsTable from "./LeaveRequestsTable";
import { card } from "@nextui-org/theme";

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
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })
  if (!session || session.user.role !== "admin") {
    return (
      <Card>
        <CardHeader>
        <CardTitle className="text-center text-xl text-red-500">Accès refusé</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">Vous n'êtes pas autorisé à accéder à cette page.</CardDescription>
      </CardContent>
      </Card>
    )
  }
  // Sample exported documents (you can replace this with actual data from your backend)
  const exportedDocuments = [
    { id: 1, name: "Rapport_Annuel_2022.pdf", date: "2023-06-30", type: "Rapport", content: "Contenu du rapport annuel 2022..." },
    { id: 2, name: "Liste_Employés_Juin2023.xlsx", date: "2023-07-01", type: "Liste", content: "Liste des employés mise à jour en juin 2023..." },
    { id: 3, name: "Contrats_Nouveaux_Employés_Q2.zip", date: "2023-07-15", type: "Contrats", content: "Contrats des nouveaux employés pour le deuxième trimestre..." },
  ];

  const handleDownload = (doc: ExportedDocument) => {
    // Implement your document download logic here
    toast.info(`Téléchargement de ${doc.name} commencé`);
  };


  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Administration RH</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="leave-requests" className="mb-5">
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
          <LeaveRequestsTable/>
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