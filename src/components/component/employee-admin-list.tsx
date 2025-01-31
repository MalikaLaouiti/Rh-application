"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchIcon, UserIcon, ShieldIcon, DownloadIcon, TrashIcon } from "lucide-react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import { deleteEmployee } from "@/action/employee"

// User type based on Prisma schema with optional image
interface User {
  id: number;
  cin: string;
  name: string;
  email: string;
  grade: string;
  department: string | null;
  image: string | null;
}

interface ListProps {
  employees: User[];
}

export default function EmployeeList({ employees }: ListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<keyof User | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Improved filtering with type safety
  const filteredUsers = employees.filter((user) => {
    if (!selectedFilter || !searchTerm) return true;
    
    const fieldValue = selectedFilter 
      ? String(user[selectedFilter]).toLowerCase() 
      : Object.values(user).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
    
    return String(fieldValue).includes(searchTerm.toLowerCase());
  });

  // Export filtered users to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des Employés et Administrateurs", 14, 15);
    
    (doc as any).autoTable({
      head: [['CIN', 'Nom', 'Email', 'Rôle', 'Département']],
      body: filteredUsers.map(user => [
        user.cin,
        user.name,
        user.email,
        user.grade,
        user.department || 'N/A'
      ]),
      startY: 20
    });
    
    doc.save("liste_employes_administrateurs.pdf");
    toast.success("Exportation réussie");
  };

  // Delete user handler
  const handleDeleteUser = async (user: User) => {
    try {
      await deleteEmployee(user.cin);
      toast.success(`Utilisateur ${user.name} supprimé avec succès !`);
      // Additional logic for removing user from list can be added here
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
      toast.error("Échec de la suppression de l'utilisateur.");
    }
  };

  // Generate avatar fallback
  const getAvatarFallback = (name: string) => 
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Liste des Employés et Administrateurs</CardTitle>
            <CardDescription>Consultez et gérez les profils des membres de l'entreprise</CardDescription>
          </div>
          <Button onClick={exportToPDF} className="ml-4">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Exporter en PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-4 ">
          <div className="w-3/5">
            <Select value={selectedFilter} onValueChange={(val) => setSelectedFilter(val as keyof User)}>
            <SelectTrigger>
              <SelectValue placeholder="Rechercher selon :" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cin">CIN</SelectItem>
              <SelectItem value="name">Nom & Prenom</SelectItem>
              <SelectItem value="department">Département</SelectItem>
              <SelectItem value="grade">Rôle</SelectItem>
            </SelectContent>
            </Select>
          </div>
          
          <div className="flex-grow relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou département"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CIN</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.cin}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.grade === "Administrateur" ? "default" : "secondary"}>
                    {user.grade === "Administrateur" ? <ShieldIcon className="mr-1 h-3 w-3" /> : <UserIcon className="mr-1 h-3 w-3" />}
                    {user.grade}
                  </Badge>
                </TableCell>
                <TableCell>{user.department || 'N/A'}</TableCell>
                <TableCell className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                        Voir le profil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Profil de {user.name}</DialogTitle>
                        <DialogDescription>Détails du profil de l'utilisateur</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-center">
                          <Avatar className="w-24 h-24">
                            <AvatarImage 
                              src={user.image || undefined} 
                              alt={user.name} 
                            />
                            <AvatarFallback>
                              {getAvatarFallback(user.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="CIN" className="text-right">CIN</Label>
                          <Input id="CIN" value={user.cin} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Nom</Label>
                          <Input id="name" value={user.name} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input id="email" value={user.email} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="grade" className="text-right">Rôle</Label>
                          <Input id="grade" value={user.grade} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="department" className="text-right">Département</Label>
                          <Input id="department" value={user.department ?? ''} className="col-span-3" readOnly />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteUser(user)}
                  >
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}