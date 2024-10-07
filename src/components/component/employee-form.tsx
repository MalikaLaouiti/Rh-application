"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Select from 'react-select';
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Toast } from "@/components/ui/toast"
import { CalendarIcon, UserIcon, BriefcaseIcon, GraduationCapIcon, HeartIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { createUser } from "@/action/employee"


export default function EmployeeForm() {
  const [employee, setEmployee] = useState({
    cin: 0,
    password: "",
    name: "",
    gender: "",
    date_of_birth: undefined as unknown as Date ,
    place_of_birth: "",
    phone_number: "",
    email: "",
    address: "",
    emergency_contact: "",
    job_title: "",
    department_id: "",
    manager_id: "",
    hire_date: undefined as unknown as Date ,
    salary: 0,
    grade: "",
    total_leave_balance: 0,
    remaining_leave_balance: 0,
    education: "",
    marital_status: "",
    dependents_count: 0,
    disability_status: false,
  })

  interface Option {
    value: string;
    label: string;
  }
  
  const genderOptions: Option[] = [
    { value: "Homme", label: "Homme" },
    { value: "Femme", label: "Femme" },
    { value: "Autre", label: "Autre" },
  ];
  
  const maritalStatusOptions: Option[] = [
    { value: "Célibataire", label: "Célibataire" },
    { value: "Marié(e)", label: "Marié(e)" },
    { value: "Divorcé(e)", label: "Divorcé(e)" },
    { value: "Veuf/Veuve", label: "Veuf/Veuve" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmployee(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (selectedOption: Option | null) => {
    setEmployee(prev => ({ ...prev, [name]: selectedOption?.value || "" })) // Use selectedOption?.value
  }
  

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setEmployee(prev => ({ ...prev, [name]: checked }))
  }

  const handleDateChange = (name: string) => (date: Date | undefined) => {
    setEmployee(prev => ({
      ...prev,
      [name]: date ? new Date(date) : undefined // Ensures the date is a Date object or undefined
    }));
  };
  
  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardTitle className="text-3xl font-bold">Formulaire d'employé</CardTitle>
        <CardDescription className="text-blue-100">Remplissez les informations de l'employé avec précision</CardDescription>
      </CardHeader>
      <form action={createUser} >
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center text-blue-800">
              <UserIcon className="mr-2" />
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cin">CIN (Numéro d'identification nationale)</Label>
                <Input id="cin" name="cin" value={employee.cin} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">password</Label>
                <Input id="password" name="password" value={employee.password} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom et Prénom</Label>
                <Input id="name" name="name" value={employee.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Sexe</Label>
                <Select
                  instanceId="my-select-instance"
                  options={maritalStatusOptions}
                  onChange={handleSelectChange('marital_status')}
                  placeholder="Sélectionnez l'état civil"
                  value={maritalStatusOptions.find(option => option.value === employee.marital_status) || null} // Find the option by value
                  isClearable
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date de naissance</Label>
                <Popover>
                  <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!employee.date_of_birth ? "text-muted-foreground" : ""}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {employee.date_of_birth 
                      ? format(employee.date_of_birth, "P", { locale: fr }) 
                      : <span>Choisir une date</span>}
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={employee.date_of_birth}
                      onSelect={handleDateChange("date_of_birth")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="place_of_birth">Lieu de naissance</Label>
                <Input id="place_of_birth" name="place_of_birth" value={employee.place_of_birth} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Numéro de téléphone</Label>
                <Input id="phone_number" name="phone_number" value={employee.phone_number} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input id="email" name="email" type="email" value={employee.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse résidentielle</Label>
                <Textarea id="address" name="address" value={employee.address} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact">Contact d'urgence</Label>
                <Input id="emergency_contact" name="emergency_contact" value={employee.emergency_contact} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center text-blue-800">
              <BriefcaseIcon className="mr-2" />
              Informations professionnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job_title">Titre du poste</Label>
                <Input id="job_title" name="job_title" value={employee.job_title} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department_id">ID du département</Label>
                <Input id="department_id" name="department_id" value={employee.department_id} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager_id">ID du responsable</Label>
                <Input id="manager_id" name="manager_id" value={employee.manager_id} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hire_date">Date d'embauche</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!employee.hire_date && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {employee.hire_date ? format(employee.hire_date, "P", { locale: fr }) : <span>Choisir une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={employee.hire_date}
                      onSelect={handleDateChange("hire_date")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salaire</Label>
                <Input id="salary" name="salary" value={employee.salary} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" name="grade" value={employee.grade} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total_leave_balance">Solde total de congés</Label>
                <Input id="total_leave_balance" name="total_leave_balance" value={employee.total_leave_balance} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remaining_leave_balance">Solde restant de congés</Label>
                <Input id="remaining_leave_balance" name="remaining_leave_balance" value={employee.remaining_leave_balance} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Éducation</Label>
                <Input id="education" name="education" value={employee.education} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marital_status">État civil</Label>
                <Select
                  instanceId="select-instance"
                  options={genderOptions}
                  onChange={handleSelectChange('gender')}
                  placeholder="Sélectionnez le sexe"
                  value={genderOptions.find(option => option.value === employee.gender) || null} // Find the option by value
                  isClearable
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dependents_count">Nombre de personnes à charge</Label>
                <Input id="dependents_count" name="dependents_count" value={employee.dependents_count} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disability_status">Statut de handicap</Label>
                <Switch checked={employee.disability_status} onCheckedChange={handleSwitchChange('disability_status')} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Soumettre</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
