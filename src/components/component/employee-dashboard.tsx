import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toast } from "@/components/ui/toast"
import { UserIcon, CalendarIcon, ClockIcon } from "lucide-react"

// Mock data for the employee
const employeeData = {
  name: "Alice Dubois",
  email: "alice@example.com",
  position: "Développeuse Full-Stack",
  department: "Technologie",
  avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice",
  leaveBalance: {
    paid: 20,
    sick: 5,
    personal: 3,
  },
}

export default function EmployeeDashboard() {
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [isLeaveBalanceDialogOpen, setIsLeaveBalanceDialogOpen] = useState(false)
  const [isLeaveRequestDialogOpen, setIsLeaveRequestDialogOpen] = useState(false)

  const handleLeaveRequest = () => {
    // Here you would typically send this data to your backend
    Toast({
      title: "Demande de congé",
      description: "Votre demande de congé a été soumise avec succès.",
    })
    setIsLeaveRequestDialogOpen(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
            <AvatarFallback>{employeeData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{employeeData.name}</CardTitle>
            <CardDescription>{employeeData.position} - {employeeData.department}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <UserIcon className="mr-2 h-4 w-4" />
              Mon compte
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informations du compte</DialogTitle>
              <DialogDescription>Vos informations personnelles</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Nom:</span>
                <span className="col-span-3">{employeeData.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Email:</span>
                <span className="col-span-3">{employeeData.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Poste:</span>
                <span className="col-span-3">{employeeData.position}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Département:</span>
                <span className="col-span-3">{employeeData.department}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isLeaveBalanceDialogOpen} onOpenChange={setIsLeaveBalanceDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Solde de congés
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solde de congés</DialogTitle>
              <DialogDescription>Votre solde de congés actuel</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Congés payés:</span>
                <span className="col-span-3">{employeeData.leaveBalance.paid} jours</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Congés maladie:</span>
                <span className="col-span-3">{employeeData.leaveBalance.sick} jours</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Congés personnels:</span>
                <span className="col-span-3">{employeeData.leaveBalance.personal} jours</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isLeaveRequestDialogOpen} onOpenChange={setIsLeaveRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <ClockIcon className="mr-2 h-4 w-4" />
              Demande de congé
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Demande de congé</DialogTitle>
              <DialogDescription>Soumettez une nouvelle demande de congé</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>Formulaire de demande de congé à implémenter ici.</p>
              <Button onClick={handleLeaveRequest}>Soumettre la demande</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}