"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { updateEmployee } from '@/action/employee'
import { Prisma } from '@prisma/client'

interface UserData {
  cin: string;
  name: string;
  gender: string;
  date_of_birth: Date;
  place_of_birth: string;
  phone_number: string;
  email: string;
  address: string;
  emergency_contact: string;
  job_title: string;
  department_id: number;
  manager_id: string;
  hire_date: Date;
  salary: number;
  grade: string;
  total_leave_balance: number;
  remaining_leave_balance: number;
  education: string;
  marital_status: string;
  dependents_count: number;
  disability_status: boolean;
}

export default function EditUserForm() {
  const [userData, setUserData] = useState<UserData>({
    cin: "",
    name: "",
    gender: "",
    date_of_birth: new Date(1990, 0, 1),
    place_of_birth: "",
    phone_number: "",
    email: "",
    address: "",
    emergency_contact: "",
    job_title: "",
    department_id: 0,
    manager_id: "",
    hire_date: new Date(2000, 0, 1),
    salary: 0,
    grade: "",
    total_leave_balance: 0,
    remaining_leave_balance: 0,
    education: "",
    marital_status: "",
    dependents_count: 0,
    disability_status: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string) => (date: Date | undefined) => {
    if (date) {
      setUserData(prev => ({ ...prev, [name]: date }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const dataToUpdate: Prisma.UserUpdateInput = {
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        date_of_birth: userData.date_of_birth,
        place_of_birth: userData.place_of_birth,
        phone_number: userData.phone_number,
        address: userData.address,
        emergency_contact: userData.emergency_contact,
        job_title: userData.job_title,
        // department: {
        //   connect: {
        //      id: Number(userData.department_id) , 
        //   },
        // },
        // manager: {
        //   connect: {
        //      id: userData.manager_id, 
        //   },
        // },
        hire_date: userData.hire_date,
        salary: userData.salary,
        grade: userData.grade,
        total_leave_balance: userData.total_leave_balance,
        remaining_leave_balance: userData.remaining_leave_balance,
        education: userData.education,
        marital_status: userData.marital_status,
        dependents_count: userData.dependents_count,
        disability_status: userData.disability_status,
        
        
      };
  
      await updateEmployee(userData.cin, dataToUpdate);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'employé :", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Modifier l'utilisateur</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cin">CIN</Label>
          <Input id="cin" name="cin" value={userData.cin} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" name="name" value={userData.name} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Genre</Label>
          <Select name="gender" value={userData.gender} onValueChange={handleSelectChange("gender")}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez le genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Homme</SelectItem>
              <SelectItem value="female">Femme</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date_of_birth">Date de naissance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {userData.date_of_birth ? format(userData.date_of_birth, "P", { locale: fr }) : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={userData.date_of_birth}
                onSelect={handleDateChange("date_of_birth")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="place_of_birth">Lieu de naissance</Label>
          <Input id="place_of_birth" name="place_of_birth" value={userData.place_of_birth} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone_number">Numéro de téléphone</Label>
          <Input id="phone_number" name="phone_number" type="tel" value={userData.phone_number} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={userData.email} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Input id="address" name="address" value={userData.address} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergency_contact">Contact d'urgence</Label>
          <Input id="emergency_contact" name="emergency_contact" value={userData.emergency_contact} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="job_title">Titre du poste</Label>
          <Input id="job_title" name="job_title" value={userData.job_title} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department_id">ID du département</Label>
          <Input id="department_id" name="department_id" value={userData.department_id} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="manager_id">ID du manager</Label>
          <Input id="manager_id" name="manager_id" value={userData.manager_id} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hire_date">Date d'embauche</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {userData.hire_date ? format(userData.hire_date, "P", { locale: fr }) : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={userData.hire_date}
                onSelect={handleDateChange("hire_date")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="salary">Salaire</Label>
          <Input id="salary" name="salary" type="number" value={userData.salary} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select name="grade" value={userData.grade} onValueChange={handleSelectChange("grade")}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez le grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="total_leave_balance">Solde total de congés</Label>
          <Input id="total_leave_balance" name="total_leave_balance" type="number" value={userData.total_leave_balance} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="remaining_leave_balance">Solde de congés restant</Label>
          <Input id="remaining_leave_balance" name="remaining_leave_balance" type="number" value={userData.remaining_leave_balance} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="education">Éducation</Label>
          <Input id="education" name="education" value={userData.education} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="marital_status">Statut marital</Label>
          <Input id="marital_status" name="marital_status" value={userData.marital_status} onChange={handleInputChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dependents_count">Nombre de personnes à charge</Label>
          <Input id="dependents_count" name="dependents_count" type="number" value={userData.dependents_count} onChange={handleInputChange} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="disability_status" 
            checked={userData.disability_status} 
            onCheckedChange={(checked) => setUserData(prev => ({ ...prev, disability_status: checked as boolean }))}
          />
          <Label htmlFor="disability_status">Statut d'invalidité</Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full">Enregistrer les modifications</Button>
    </form>
  )
}