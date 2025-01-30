"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createLeaveRequest, getLeaveRequestById } from "@/action/conge";

// Constants
const CONSTANTS = {
  DEBOUNCE_DELAY: 500,
  LEAVE_TYPES: {
    VACATION: 'Vacances',
    SICK: 'Maladie',
    TRAINING: 'Formation',
  },
  STATUS: {
    PENDING: 'En attente',
    APPROVED: 'Approuvée',
    REJECTED: 'Rejetée',
  }
} as const;

// Types
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

// Schema
const leaveRequestSchema = z.object({
  employeeCin: z.string().min(1, "CIN est requis"),
  startDate: z.date({ required_error: "Date de début est requise" }),
  endDate: z.date({ required_error: "Date de fin est requise" }),
  leaveType: z.enum(["Vacances", "Maladie", "Formation"]),
  reason: z.string().min(10, "Le motif doit contenir au moins 10 caractères"),
}).refine(data => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "La date de fin doit être après la date de début",
  path: ["endDate"],
});

type FormValues = z.infer<typeof leaveRequestSchema>;

export default function LeaveRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveList, setLeaveList] = useState<LeaveRequest[]>([]);
  const [searchCin, setSearchCin] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      employeeCin: "",
      startDate: undefined,
      endDate: undefined,
      leaveType: undefined,
      reason: "",
    },
    resolver: zodResolver(leaveRequestSchema),
    mode: "onBlur",
  });

  const fetchLeaveRequests = useCallback(async (cin: string) => {
    if (!cin.trim()) {
      setLeaveList([]);
      return;
    }

    try {
      const result = await getLeaveRequestById(cin);
      setLeaveList(Array.isArray(result) ? result : result ? [result] : []);
    } catch (error) {
      console.error("Failed to fetch leave requests:", error);
      setLeaveList([]);
      toast.error("Erreur lors de la recherche des demandes");
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLeaveRequests(searchCin);
    }, CONSTANTS.DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [searchCin, fetchLeaveRequests]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value);
        }
      });

      await createLeaveRequest(formData);
      toast.success("Demande créée avec succès !");
      await fetchLeaveRequests(data.employeeCin);
      form.reset();
    } catch (error) {
      console.error("Failed to create LeaveRequest:", error);
      toast.error("Échec de la création de la demande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusConfig = (status: string | null) => {
    const configs = {
      [CONSTANTS.STATUS.PENDING]: { color: 'bg-yellow-500', text: CONSTANTS.STATUS.PENDING },
      [CONSTANTS.STATUS.APPROVED]: { color: 'bg-green-500', text: CONSTANTS.STATUS.APPROVED },
      [CONSTANTS.STATUS.REJECTED]: { color: 'bg-red-500', text: CONSTANTS.STATUS.REJECTED },
      default: { color: 'bg-gray-500', text: 'Status inconnu' }
    };
    return configs[status as keyof typeof configs] ?? configs.default;
  };

  const renderLeaveRequestList = () => (
    <div className="grid gap-4">
      {leaveList.length > 0 ? (
        leaveList.map((request) => {
          const start = new Date(request.startDate).toLocaleDateString();
          const end = new Date(request.endDate).toLocaleDateString();
          const statusConfig = getStatusConfig(request.status);

          return (
            <div
              key={request.id}
              className="grid grid-cols-[25px_1fr_100px] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              <span className={`flex h-2 w-2 rounded-full ${statusConfig.color}`} />
              <div>
                <p className="text-sm font-medium">
                  Congé du {start} au {end}
                </p>
                <p className="text-sm text-gray-500">Type: {request.leaveType}</p>
                <p className="text-sm text-gray-500">Motif: {request.reason}</p>
              </div>
              <p className={`text-sm font-medium text-${statusConfig.color}`}>
                {statusConfig.text}
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
  );

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
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            field.onChange(e);
                            setSearchCin(e.target.value);
                          }}
                        />
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
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
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
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un type de congé" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(CONSTANTS.LEAVE_TYPES).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
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

                <Button 
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Soumission en cours..." :"Soumettre la demande"}
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
            {renderLeaveRequestList()}
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}