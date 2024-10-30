"use client"
import { useState, useEffect } from "react"
import Select from 'react-select';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchIcon, UserIcon, ShieldIcon, DownloadIcon } from "lucide-react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { deleteEmployee, getAllEmployees } from "@/action/employee";


const UserOptions = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'department', label: 'Department' },
];

// User type based on Prisma schema
interface User {
  id: number ;
  cin: string ; 
  name: string ; 
  email: string; 
  grade: string ; 
  department:number 
}

interface ListProps {
  employees: User[];
}

export default function List({ employees }: ListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<{ value: string; label: string } | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  // Filter users based on search and selected filter
  const filteredUsers = employees.filter(user => {
    if (!selectedFilter || !searchTerm) return true;
    const fieldValue = user[selectedFilter.value as keyof User] as string;
    return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Export filtered users to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des Employés et Administrateurs", 14, 15);
    (doc as any).autoTable({
      head: [['CIN','Nom', 'Email', 'Rôle', 'Département']],
      body: filteredUsers.map(user => [
        user.cin,
        user.name,
        user.email,
        user.grade,
        user.department
      ]),
      startY: 20
    });
    doc.save("liste_employes_administrateurs.pdf");
    toast.success("Exportation réussie");
    
  };

  const onSubmit = async (data: User) => {
    try {
      await deleteEmployee(data.cin, ); // Ensure the `updateEmployee` function is correctly defined to accept these parameters
      toast.success("Utilisateur supprimé avec succès !");
      //reset();//a tester
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
      toast.error("Échec de la suppression de l'utilisateur.");
    }
  };
  const user = getAllEmployees();
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
        <div className="mb-4">
          <Select
            classNamePrefix="custom-select"
            value={selectedFilter}
            onChange={(option) => setSelectedFilter(option)}
            options={UserOptions}
            placeholder="Rechercher selon :"
          />
          <Label htmlFor="search" className="sr-only">Rechercher</Label>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Rechercher par nom, email ou département"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
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
              <TableHead>Action</TableHead>
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
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                        Voir le profil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Profil de {selectedUser?.name}</DialogTitle>
                        <DialogDescription>Détails du profil de l'utilisateur</DialogDescription>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center justify-center">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedUser.name}`} alt={selectedUser.name} />
                              <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="CIN" className="text-right">CIN</Label>
                            <Input id="CIN" value={selectedUser.cin} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nom</Label>
                            <Input id="name" value={selectedUser.name} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" value={selectedUser.email} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="grade" className="text-right">Rôle</Label>
                            <Input id="grade" value={selectedUser.grade} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="department" className="text-right">Département</Label>
                            <Input id="department" value={selectedUser.department} className="col-span-3" readOnly />
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                      <Button variant="outline" size="sm" onClick={() => onSubmit(user)}>
                        Supprimer
                      </Button>
                      <ToastContainer/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    
  );
}
