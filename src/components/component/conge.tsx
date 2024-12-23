"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { createLeaveRequest, getLeaveRequestById } from "@/action/conge";
import { toast, ToastContainer } from "react-toastify";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

// Define the type for LeaveRequest
interface LeaveRequest {
  id: string;
  employeeCin: string;
  startDate: Date;
  endDate: Date;
  leaveType: string;
  reason: string;
  status: string | null;
  requestedBy: { name: string | null; department: string | null } | null;
  approvedBy: { name: string | null } | null;
  approvedById: string | null;
}

export default function Conge() {
  const form = useForm({
    defaultValues: {
      employeeCin: "",
      startDate: "",
      endDate: "",
      leaveType: "",
      reason: "",
    },
    mode: "onBlur",
  });

  const [leaveList, setLeaveList] = useState<LeaveRequest[]>([]);
  const [searchCin, setSearchCin] = useState("");

  // Modify the fetch function to use searchCin
  const fetchLeaveRequests = async (cin: string) => {
    if (cin.trim()) {  // Only fetch if CIN is not empty
      try {
        const result = await getLeaveRequestById(cin);
        if (Array.isArray(result)) {
          setLeaveList(result);
        } else if (result) {
          setLeaveList([result]); // If single result, wrap in array
        } else {
          setLeaveList([]); // Empty array if no results
        }
      } catch (error) {
        console.error("Failed to fetch leave requests:", error);
        setLeaveList([]); // Clear list on error
        toast.error("Erreur lors de la recherche des demandes");
      }
    } else {
      setLeaveList([]); // Clear list if CIN is empty
    }
  };

  // Add debounce to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(searchCin);
      fetchLeaveRequests(searchCin);
    }, 500); // Wait 500ms after last keystroke

    return () => clearTimeout(timeoutId);
  }, [searchCin]);

  const onSubmit = async (data: Record<string, string>) => {
    const formDataToSubmit = new FormData();
    console.log(data);
    Object.entries(data).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    try {
      console.log(formDataToSubmit);
      await createLeaveRequest(formDataToSubmit);
      toast.success("Demande créée avec succès !");
      fetchLeaveRequests(data.employeeCin);
    } catch (error) {
      console.error("Failed to create LeaveRequest:", error);
      toast.error("Échec de la création de la demande.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Demandes de congé</h1>
          <p className="text-muted-foreground">Soumettez votre demande de congé et suivez son état.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle demande de congé</CardTitle>
            <CardDescription>Remplissez le formulaire ci-dessous pour soumettre votre demande.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto mt-10"
              >
                <FormField
                  control={form.control}
                  name="employeeCin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CIN</FormLabel>
                      <FormControl>
                        <Input 
                        placeholder="Entrer CIN" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);  // Update form value
                          setSearchCin(e.target.value as string);  // Update search state
                        }}>
                        </Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start font-normal">
                              {field.value ? new Date(field.value).toLocaleDateString() : "Choisir une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de fin</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start font-normal">
                              {field.value ? new Date(field.value).toLocaleDateString() : "Choisir une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="leaveType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de congé</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un type de congé" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vacation">Vacances</SelectItem>
                            <SelectItem value="sick">Maladie</SelectItem>
                            <SelectItem value="training">Formation</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motif du congé</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Expliquez la raison de votre demande" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Soumettre la demande
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suivi des demandes</CardTitle>
            <CardDescription>
              {leaveList.length > 0 
                ? `Affichage des demandes pour le CIN: ${searchCin}`
                : searchCin 
                  ? "Aucune demande trouvée pour ce CIN"
                  : "Entrez un CIN pour voir les demandes"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {leaveList.length > 0 ? (
                leaveList.map((leaveRequest) => {
                  const { id, startDate, endDate, leaveType, status, reason } = leaveRequest;
                  const start = new Date(startDate).toLocaleDateString();
                  const end = new Date(endDate).toLocaleDateString();

                  let statusColor;
                  let statusText;
                  switch (status) {
                    case 'En attente':
                      statusColor = 'bg-yellow-500';
                      statusText = 'En attente';
                      break;
                    case 'Approuvée':
                      statusColor = 'bg-green-500';
                      statusText = 'Approuvée';
                      break;
                    case 'Rejetée':
                      statusColor = 'bg-red-500';
                      statusText = 'Rejetée';
                      break;
                    default:
                      statusColor = 'bg-gray-500';
                      statusText = 'Status inconnu';
                  }

                  return (
                    <div
                      key={id}
                      className="grid grid-cols-[25px_1fr_100px] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className={`flex h-2 w-2 rounded-full ${statusColor}`} />
                      <div>
                        <p className="text-sm font-medium">
                          Congé du {start} au {end}
                        </p>
                        <p className="text-sm text-gray-500">Type: {leaveType}</p>
                        <p className="text-sm text-gray-500">Motif: {reason}</p>
                      </div>
                      <p className={`text-sm font-medium text-${statusColor}`}>
                        {statusText}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {searchCin ? "Aucune demande trouvée" : "Entrez un CIN pour voir les demandes"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}
