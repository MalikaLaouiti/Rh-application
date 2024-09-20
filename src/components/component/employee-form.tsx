"use client"
import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
 import { Toast } from '@/components/ui/toast';
import "@/app/globals.css";
import {PrismaClient} from '@prisma/client';

const db= new PrismaClient();

const departmentOptions = [
  { value: 'rh', label: 'Ressources Humaines' },
  { value: 'it', label: 'IT' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'operations', label: 'Opérations' },
];

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    startDate: '',
    department: '',
    position: '',
    salary: '',
    address: '',
    emergencyContact: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    setFormData((prev) => ({
      ...prev,
      department: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous ajouteriez la logique pour envoyer les données à votre backend
    const user =  db.employee.create({formData});
    console.log("Données de l'employé soumises:", formData);
    Toast({
      title: "Employé ajouté",
      description: "Les informations de l'employé ont été enregistrées avec succès.",
    });
    // Réinitialiser le formulaire après la soumission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      startDate: "",
      department: "",
      position: "",
      salary: "",
      address: "",
      emergencyContact: "",
      notes: "",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Ajouter un nouvel employé</CardTitle>
        <CardDescription>Remplissez les informations du nouvel employé. Tous les champs marqués d'un * sont obligatoires.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date de naissance</Label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début *</Label>
              <Input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Département *</Label>
              <Select
                className="department"
                id="department"
                value={departmentOptions.find(option => option.value === formData.department) || null}
                onChange={handleSelectChange}
                options={departmentOptions}
                placeholder="Sélectionnez un département"
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Poste *</Label>
              <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Salaire annuel</Label>
            <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Contact d'urgence</Label>
            <Input id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes supplémentaires</Label>
            <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full"  onClick={handleSubmit}>
          Ajouter l'employé
        </Button >
      </CardFooter>
    </Card>
  );
}