import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function AccountDetail() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [status, session]);

  // Handle authentication states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied. Please log in first.</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
   <div>
  <Card>
    <CardHeader>
      <Avatar>
        <AvatarImage src={userData?.image || "/placeholder-user.jpg"} alt="Avatar de l'utilisateur" />
        <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
      </Avatar>
    </CardHeader>
    <CardContent>
      <h2>{userData?.name}</h2>
      <p><strong>Email :</strong> {userData?.email}</p>
      <p><strong>CIN :</strong> {userData?.cin}</p>
      <p><strong>Genre :</strong> {userData?.gender}</p>
      <p><strong>Date de naissance :</strong> {userData?.date_of_birth ? new Date(userData.date_of_birth).toLocaleDateString() : "Non disponible"}</p>
      <p><strong>Numéro de téléphone :</strong> {userData?.phone_number || "Non disponible"}</p>
      <p><strong>Adresse :</strong> {userData?.address || "Non disponible"}</p>
      <p><strong>Poste :</strong> {userData?.job_title || "Non disponible"}</p>
      <p><strong>Salaire :</strong> {userData?.salary ? `${userData.salary.toFixed(2)} €` : "Non disponible"}</p>
      <p><strong>Statut matrimonial :</strong> {userData?.marital_status || "Non disponible"}</p>
      <p><strong>Solde total des congés :</strong> {userData?.total_leave_balance || 0}</p>
      <p><strong>Solde restant des congés :</strong> {userData?.remaining_leave_balance || 0}</p>
      <p><strong>Département :</strong> {userData?.department || "Non disponible"}</p>
    </CardContent>
  </Card>
</div>

  );
}
