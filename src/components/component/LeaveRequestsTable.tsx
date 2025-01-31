
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, XIcon, EyeIcon, DownloadIcon } from "lucide-react";
import { getAllLeaveRequests, updateLeaveRequest } from "@/action/conge";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface LeaveRequest {
    id: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: string | null;
    requestedBy?: {
        name: string | null;
        department: string | null;
    } | null;
}
export default function LeaveRequestsTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [cin, setCin] = useState<any>(null);
    const [requests, setRequests] = useState<LeaveRequest[]>([]);
    const [error, setError] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);

    const [dateRangeFilter, setDateRangeFilter] = useState<{
        startDate: string | null,
        endDate: string | null
    }>({
        startDate: null,
        endDate: null
    });

    const getBadgeVariant = (status: string) => {
        switch (status) {
            case "Approuvée":
                return "success";
            case "Rejetée":
                return "destructive";
            default:
                return "default";
        }
    };

    const fetchRequests = async () => {
        try {
            setIsLoading(true);
            const data = await getAllLeaveRequests();
            setRequests(data);
        } catch (error) {
            console.error("Failed to fetch leave requests:", error);
            toast.error("Erreur lors du chargement des demandes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Handle request approval
    const handleApprove = async (id: string) => {
        try {
            const updateData = {
                approvedById: cin,
                approvedAt: new Date().toISOString(),
                status: 'Approuvée'
            };

            await updateLeaveRequest(id, updateData);
            await fetchRequests(); // Refresh the list
            toast.success("Demande approuvée avec succès");
        } catch (error) {
            console.error("Failed to approve request:", error);
            toast.error("Erreur lors de l'approbation de la demande");
        }
    };

    // Handle request rejection
    const handleReject = async (id: string) => {
        try {
            const updateData = {
                approvedById: cin,
                approvedAt: new Date().toISOString(),
                status: 'Rejetée'
            };

            await updateLeaveRequest(id, updateData);
            await fetchRequests(); // Refresh the list
            toast.success("Demande rejetée avec succès");
        } catch (error) {
            console.error("Failed to reject request:", error);
            toast.error("Erreur lors du rejet de la demande");
        }
    };


    useEffect(() => {
        const filterRequests = () => {
            const filtered = requests.filter(request => {
                const matchesSearch = searchTerm
                    ? request.requestedBy?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    request.reason.toLowerCase().includes(searchTerm.toLowerCase())
                    : true;

                const matchesStatus = statusFilter === 'all'
                    ? true
                    : request.status === statusFilter;

                const matchesDateRange =
                    (!dateRangeFilter.startDate || new Date(request.startDate) >= new Date(dateRangeFilter.startDate)) &&
                    (!dateRangeFilter.endDate || new Date(request.endDate) <= new Date(dateRangeFilter.endDate));

                return matchesSearch && matchesStatus && matchesDateRange;
            });

            setFilteredRequests(filtered);
        };

        filterRequests();
    }, [requests, searchTerm, statusFilter, dateRangeFilter]);



    return (
        <Card className="w-full mt-5">
            <CardHeader>
                <CardTitle>Demandes de congé</CardTitle>
                <CardDescription>Gérez les demandes de congé</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex space-x-4">
                    <Input
                        placeholder="Rechercher par nom ou raison"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/3"
                    />

                    <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value)}
                    >
                        <SelectTrigger className="w-1/4">
                            <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="En attente">En attente</SelectItem>
                            <SelectItem value="Approuvée">Approuvée</SelectItem>
                            <SelectItem value="Rejetée">Rejetée</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex space-x-2">
                        <Input
                            type="date"
                            value={dateRangeFilter.startDate || ''}
                            onChange={(e) => setDateRangeFilter(prev => ({
                                ...prev,
                                startDate: e.target.value
                            }))}
                            placeholder="Date de début"
                        />
                        <Input
                            type="date"
                            value={dateRangeFilter.endDate || ''}
                            onChange={(e) => setDateRangeFilter(prev => ({
                                ...prev,
                                endDate: e.target.value
                            }))}
                            placeholder="Date de fin"
                        />
                    </div>
                </div>
                <TabsContent value="leave-requests">
                    {isLoading ? (
                        <div className="text-center py-4">Chargement des demandes...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employé</TableHead>
                                    <TableHead>Date de début</TableHead>
                                    <TableHead>Date de fin</TableHead>
                                    <TableHead>Raison</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.requestedBy?.name}</TableCell>
                                        <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{request.reason}</TableCell>
                                        <TableCell>
                                            <Badge variant={getBadgeVariant(request.status ?? "default")}>
                                                {request.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleApprove(request.id)}
                                                    disabled={request.status !== "En attente"}
                                                    className="bg-green-500"
                                                >
                                                    <CheckIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleReject(request.id)}
                                                    disabled={request.status !== "En attente"}
                                                    className="bg-red-500"
                                                >
                                                    <XIcon className="h-4 w-4" />
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="outline">
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Détails de la demande de congé</DialogTitle>
                                                            <DialogDescription>
                                                                Informations détaillées sur la demande de {request.requestedBy?.name}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-2">
                                                            <p><strong>Employé:</strong> {request.requestedBy?.name}</p>
                                                            <p><strong>Département:</strong> {request.requestedBy?.department}</p>
                                                            <p><strong>Date de début:</strong> {new Date(request.startDate).toLocaleDateString()}</p>
                                                            <p><strong>Date de fin:</strong> {new Date(request.endDate).toLocaleDateString()}</p>
                                                            <p><strong>Raison:</strong> {request.reason}</p>
                                                            <p><strong>Statut:</strong> {request.status}</p>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TabsContent>
            </CardContent>
        </Card>
    )
};