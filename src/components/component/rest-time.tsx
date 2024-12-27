'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getLeaveRequestsByCriteria } from "@/action/conge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Rest() {
  const [leaveList, setLeaveList] = useState<any[]>([]); // State for leave requests
  const [leaveCounts, setLeaveCounts] = useState<{ sick: number; formation: number; rest: number }>({
    sick: 0,
    formation: 0,
    rest: 0,
  });
  const [leaveBalances, setLeaveBalances] = useState<{
    sickLeave: number;
    formationLeave: number;
    restLeave: number;
  }>({
    sickLeave: 0,
    formationLeave: 0,
    restLeave: 0,
  });
  const [user, setUser] = useState<any>(null); // State for user data

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  // Fetch user data and leave balances
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchUserData = async () => {
        try {
          // Fetch user data using the session user ID
          const response = await fetch(`/api/users/${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);

            // Assuming the user data contains leave balance information
            setLeaveBalances({
              sickLeave: data.user.sick_leave_balance || 0,
              formationLeave: data.user.formation_leave_balance || 0,
              restLeave: data.user.rest_leave_balance || 0,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      fetchUserData();
    }
  }, [status, session]);

  // Fetch leave requests when user data is available
  useEffect(() => {
    if (user?.cin) {
      const fetchLeaveRequests = async (cin: string) => {
        const criteria = { employeeCin: cin };
        if (cin.trim()) {
          try {
            const result = await getLeaveRequestsByCriteria(criteria);
            if (Array.isArray(result)) {
              setLeaveList(result);

              // Count leave requests by type (sick, formation, rest)
              const counts = { sick: 0, formation: 0, rest: 0 };
              result.forEach((request) => {
                if (request.status === "sick") counts.sick++;
                else if (request.status === "formation") counts.formation++;
                else if (request.status === "rest") counts.rest++;
              });
              setLeaveCounts(counts);
            }
          } catch (error) {
            console.error("Failed to fetch leave requests:", error);
            setLeaveList([]);
          }
        }
      };

      fetchLeaveRequests(user.cin);
    }
  }, [user]); // Trigger the effect when user data changes

  if (status === "loading" || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background text-foreground rounded-lg border p-6 w-full max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Solde Congé de Maladie Card */}
          <Card>
            <CardHeader>
              <CardTitle>Solde de congé de maladie</CardTitle>
              <CardDescription>Consultez vos congés.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Jour de congé restant</div>
                <div className="text-2xl font-bold">{leaveBalances.sickLeave} jours</div>
              </div>
              <div className="grid gap-4">
                <Button size="lg" className="w-full">Consulter les demandes de congé</Button>
              </div>
            </CardContent>
          </Card>

          {/* Congé de Maladie Card */}
          <Card>
            <CardHeader>
              <CardTitle>Congé de maladie</CardTitle>
              <CardDescription>Consultez et demandez des jours de congé de maladie.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Congé de maladie restant</div>
                <div className="text-2xl font-bold">{leaveBalances.sickLeave} jours</div>
              </div>
              <div className="grid gap-4">
                <Button size="lg" className="w-full">Demander un congé de maladie</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Congé de Formation Card */}
          <Card>
            <CardHeader>
              <CardTitle>Congé de formation</CardTitle>
              <CardDescription>Consultez et demandez du temps de formation.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Congé de formation restant</div>
                <div className="text-2xl font-bold">{leaveBalances.formationLeave} jours</div>
              </div>
              <div className="grid gap-4">
                <Button size="lg" className="w-full">Demander un congé de formation</Button>
              </div>
            </CardContent>
          </Card>

          {/* Temps de Repos Card */}
          <Card>
            <CardHeader>
              <CardTitle>Temps de repos</CardTitle>
              <CardDescription>Consultez et demandez du temps de repos.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Temps de repos restant</div>
                <div className="text-2xl font-bold">{leaveBalances.restLeave} jours</div>
              </div>
              <div className="grid gap-4">
                <Button size="lg" className="w-full">Demander du temps de repos</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
