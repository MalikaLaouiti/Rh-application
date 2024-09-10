"use client"
import { useState } from "react"
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
import { Toast } from "@/components/ui/toast"
import jsPDF from 'jspdf'
import 'jspdf-autotable'; // Ensure you have this line to include the plugin

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}

const UserOptions = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'department', label: 'Department' },
  // add as many options as you want
];

// Sample user data
const users: User[] = [
  { id: 1, name: "Alice Dubois", email: "alice@example.com", role: "Employé", department: "Marketing", joinDate: "2022-03-15" },
  { id: 2, name: "Bob Martin", email: "bob@example.com", role: "Administrateur", department: "RH", joinDate: "2021-01-10" },
  { id: 3, name: "Claire Lefebvre", email: "claire@example.com", role: "Employé", department: "Finance", joinDate: "2023-05-20" },
  { id: 4, name: "David Moreau", email: "david@example.com", role: "Employé", department: "IT", joinDate: "2022-11-05" },
  { id: 5, name: "Émilie Rousseau", email: "emilie@example.com", role: "Administrateur", department: "Direction", joinDate: "2020-07-01" },
]

export default function List() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedFilter, setSelectedFilter] = useState<{ value: string; label: string } | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user => {
    if (!selectedFilter || !searchTerm) return true
    const fieldValue = user[selectedFilter.value as keyof User] as string
    return fieldValue.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text("Liste des Employés et Administrateurs", 14, 15);
    (doc as any).autoTable({
      head: [['Nom', 'Email', 'Rôle', 'Département', 'Date d\'entrée']],
      body: filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.department,
        user.joinDate
      ]),
      startY: 20
    })
    doc.save("liste_employes_administrateurs.pdf")
    Toast({
      title: "Exportation réussie",
      description: "Le PDF a été généré et téléchargé avec succès.",
    })
  }

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
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "#FFF",
                borderColor: state.isFocused ? "#333" : "#B1B2B9",
                boxShadow: state.isFocused ? "0 0 0 2px rgba(51, 51, 51, 0.2)" : "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                "&:hover": { borderColor: "#B1B2B9" },
              }),
              singleValue: (base) => ({
                ...base,
                color: "#333",
                fontWeight: "500",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#FFF",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                transition: "opacity 0.3s ease",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "#f0f0f0" : "#FFF",
                color: state.isSelected ? "#333" : "#666",
                fontWeight: state.isSelected ? "500" : "400",
                "&:hover": {
                  backgroundColor: "#B1B2B9",
                  color: "#333",
                },
                padding: "10px 15px",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }),
            }}
            
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
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "Administrateur" ? "default" : "secondary"}>
                    {user.role === "Administrateur" ? <ShieldIcon className="mr-1 h-3 w-3" /> : <UserIcon className="mr-1 h-3 w-3" />}
                    {user.role}
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
                            <Label htmlFor="name" className="text-right">
                              Nom
                            </Label>
                            <Input id="name" value={selectedUser.name} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input id="email" value={selectedUser.email} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                              Rôle
                            </Label>
                            <Input id="role" value={selectedUser.role} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="department" className="text-right">
                              Département
                            </Label>
                            <Input id="department" value={selectedUser.department} className="col-span-3" readOnly />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="joinDate" className="text-right">
                              Date d'entrée
                            </Label>
                            <Input id="joinDate" value={selectedUser.joinDate} className="col-span-3" readOnly />
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
