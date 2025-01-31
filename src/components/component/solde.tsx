'use client';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDaysIcon } from "@/components/ui/calendar-icon"
import { CalendarPlusIcon } from "@/components/ui/calendarPlus"
import { CalendarCheckIcon } from "@/components/ui/calendarCheck"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { deleteLeaveRequest, getLeaveRequestById, updateLeaveRequest } from "@/action/conge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import EditLeaveRequest from "./editLeaveCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const Solde = () => {
  const [userData, setUserData] = useState<any>(null);
  const [leaveList, setLeaveList] = useState<any[]>([]); // State for leave requests
  const [cin, setCin] = useState<string>(""); // State for CIN
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{ id: string; leaveType: string; startDate: string; endDate: string; reason: string; } | null>(null);
  const [error, setError] = useState<string>("");

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
            setCin(data.user.cin);
          } else {
            setError("Failed to fetch user data");
          }
        } catch (error) {
          setError("Error fetching user data");
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [status, session]);

  // Fetch leave requests based on CIN
  const fetchLeaveRequests = async (cin: string) => {
    if (cin.trim()) {
      try {
        const result = await getLeaveRequestById(cin);
        if (Array.isArray(result)) {
          setLeaveList(result);
        } else if (result) {
          setLeaveList([result]);
        } else {
          setLeaveList([]);
        }
      } catch (error) {
        console.error("Failed to fetch leave requests:", error);
        setLeaveList([]);
        setError("Erreur lors de la recherche des demandes");
      }
    } else {
      setLeaveList([]);
    }
  };

  useEffect(() => {
    if (cin) {
      fetchLeaveRequests(cin);
    }
  }, [cin]);

  if (status === "loading") {
    return <div>Loading...</div>
  }

  const displayEditCard = (request: any) => {
    setSelectedRequest(request);
    setIsEditModalOpen(true);
  };

  const handleUpdateRequest = async (id: string, updatedData: any) => {
    try {
      await updateLeaveRequest(id, updatedData);
      await fetchLeaveRequests(cin);
      setError("");
    } catch (error) {
      console.error("Failed to update leave request:", error);
      throw error;
    }
  };
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center h-16 px-4 border-b border-muted shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <h1 className="sr-only">Congés</h1>
        </nav>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Solde de congés</CardTitle>
              <CalendarDaysIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.total_leave_balance}</div>
              <p className="text-xs text-muted-foreground">Restants cette année</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Congés pris</CardTitle>
              <CalendarCheckIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.remaining_leave_balance}</div>
              <p className="text-xs text-muted-foreground">Cette année</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Demande de congés</CardTitle>
              <CalendarPlusIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <a href="/Holiday/Demande" className="text-primary">
                  <Button variant="outline" size="sm">
                    Faire une demande
                  </Button>
                </a>
              </div>
              <p className="text-xs text-muted-foreground">Demandez vos congés</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type de congé</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date de demande</TableHead>
                  <TableHead>Raison</TableHead>
                  <TableHead >Actions</TableHead>
                  {leaveList.some(request => request.status === "Approuvé") && (
                    <TableHead className="text-right">Date d'approbation</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveList.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{new Date(request.requestedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell className="text-right">
                      <Select onValueChange={async (value) => {
                        if (value === "modifier") {
                          displayEditCard(request);
                        } else if (value === "delete") {
                          if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
                            await deleteLeaveRequest(request.id);
                          }
                        }
                      }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Actions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modifier" className="text-blue-400">Modifier</SelectItem>
                          <SelectItem value="delete" className="text-red-400">Supprimer</SelectItem>
                        </SelectContent>
                      </Select>

                    </TableCell>

                    {request.status === "Approuvé" && (
                      <TableCell className="text-right">{new Date(request.approvedAt).toLocaleDateString()}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          {selectedRequest && (
            <EditLeaveRequest
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              request={selectedRequest}
              onUpdate={handleUpdateRequest}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default Solde;
