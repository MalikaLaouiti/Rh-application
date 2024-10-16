"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/action/employee";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    cin: '',
    password: '',
    name: '',
    gender: '',
    phone_number: '',
    email: '',
    grade: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Create a FormData instance
    const formDataToSubmit = new FormData();

    // Append each field from formData to formDataToSubmit
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    await createUser(formDataToSubmit); // Send FormData to createUser
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Inscription à RH Application</h2>
        <div className="space-y-2">
          <Label htmlFor="cin">CIN</Label>
          <Input id="cin" name="cin" required value={formData.cin} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" required value={formData.password} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Genre</Label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone_number">Numéro de téléphone</Label>
          <Input id="phone_number" name="phone_number" type="tel" required value={formData.phone_number} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Sélectionnez votre rôle</Label>
          <select
            id="grade"
            name="grade"
            required
            value={formData.grade}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <Button type="submit" className="w-full">S'inscrire</Button>
      </form>
    </div>
  );
}
