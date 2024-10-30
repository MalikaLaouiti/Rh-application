"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { updateEmployee } from '@/action/employee'
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


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
  manager_id: number;
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
  const form = useForm<UserData>({
    defaultValues: {
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
      // department_id: 0 as number,
      manager_id: 0,
      hire_date: new Date(2000, 0, 1),
      salary: 0 as number,
      grade: "",
      total_leave_balance: 0,
      remaining_leave_balance: 0,
      education: "",
      marital_status: "",
      dependents_count: 0,
      disability_status: false,
    },
    mode: 'onBlur',
  })

  const handleDateChange = (name: keyof UserData) => (date: Date) => {
    form.setValue(name, date);
  };

  const onSubmit = async (data: UserData) => {
    try {
      await updateEmployee(data.cin, data); // Ensure the `updateEmployee` function is correctly defined to accept these parameters
      toast.success("Utilisateur modifié avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'employé :", error);
      toast.error("Échec de la modification de l'utilisateur.");
    }
  };

  return (
    <div className="mx-auto mt-10 mb-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto mt-10"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Modifier l'utilisateur</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cin"
              rules={{ required: "Entrer votre CIN", pattern: { value: /^\d{8}$/, message: "Entrer correctement votre CIN (8 nombres) " } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CIN</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer CIN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Entrer votre nom et prenom" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom & Prenom</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer votre nom et prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              rules={{ required: "Selectionner votre sex" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Homme">Homme</SelectItem>
                      <SelectItem value="Femme">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "P", { locale: fr }) : <span>Choisir une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="place_of_birth"
              rules={{ required: "Entrer lieu de naissance" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer lieu de naissance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              rules={{ required: "Entrer votre numero de telephone" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input  placeholder="Entrer votre numero de telephone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Entrer votre E-mail" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer votre E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              rules={{ required: "Entrer votre address" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer votre address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergency_contact"
              rules={{ required: "Entrer votre contact d'urgence " }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact d'urgence</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer votre contact d'urgence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="job_title"
              rules={{ required: "Entrer titre du poste" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du poste</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer titre du poste" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department_id"
              rules={{ required: "Entrer Id du département" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id du département</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer Id du département" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="manager_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="manager_id">ID du manager</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" id="manager_id" placeholder="Entrer l'ID du manager" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hire Date */}
            <FormField
              name="hire_date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'embauche</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "P", { locale: fr }) : <span>Choisir une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="salary"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salaire</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Entrer le salaire" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="grade"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="total_leave_balance"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solde total de congés</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Entrer le solde total" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="remaining_leave_balance"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solde de congés restant</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Entrer le solde restant" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="education"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Éducation</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entrer le niveau d'éducation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="marital_status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut marital</FormLabel>
                  <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le statut marital" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="célibataire">célibataire</SelectItem>
                        <SelectItem value="marié(e)">Marié(e)</SelectItem>
                        <SelectItem value="divorcé(e)">divorcé(e)</SelectItem>
                        <SelectItem value="veuf">veuf</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dependents_count"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de personnes à charge</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Entrer le nombre de personnes à charge" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="disability_status"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="disability_status">Statut d'invalidité</FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-full max-w-xs">
              Enregistrer les modifications
            </Button>
          </div>
          
        </form>
      </Form>
      <ToastContainer />
    </div >
  )
}