"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/action/employee";
import { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { cn } from "@nextui-org/theme";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Inscription RH Application</h2>

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
          <Input id="gender" name="gender" required value={formData.gender} onChange={handleInputChange} />
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
          <RadioGroup
            label="Selectionez votre role"
            value={formData.grade}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}

          >
            <Radio classNames={{
              base: "flex items-center cursor-pointer bg-white hover:bg-gray-50 rounded-md transition duration-150 ease-in-out max-w-[300px] p-3 border border-gray-300 hover:border-gray-500 data-[selected=true]:border-gray-500 data-[selected=true]:bg-gray-50 text-sm font-medium text-gray-700",
              wrapper: "flex items-center",
              control: "w-5 h-5 border-1 border-gray-200 rounded-md flex items-center justify-center mr-3 data-[selected=true]:border-gray-500",
              labelWrapper: "flex items-center",
              label: "text-gray-800 data-[selected=true]:text-gray-600",
            }}
              value="Admin">Admin</Radio>
            <Radio classNames={{
              base: "flex items-center cursor-pointer bg-white hover:bg-gray-50 rounded-md transition duration-150 ease-in-out max-w-[300px] p-3 border border-gray-300 hover:border-gray-500 data-[selected=true]:border-gray-500 data-[selected=true]:bg-gray-50 text-sm font-medium text-gray-700",
              wrapper: "flex items-center",
              control: "w-5 h-5 border-1 border-gray-200 rounded-md flex items-center justify-center mr-3 data-[selected=true]:border-gray-500",
              labelWrapper: "flex items-center",
              label: "text-gray-800 data-[selected=true]:text-gray-600",
            }} 
            value="Employee">Employee</Radio>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">S'inscrire</Button>
      </form>
    </div>
  );
}
