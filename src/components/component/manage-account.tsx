import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export  default async function AccountDetail() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  // Add console logs to debug the session state
  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    
  }, [status, session]);
  const userId = session?.user.id;
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
    setUserData(data.user);
  // Handle authentication states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied. Please log in first.</div>;
  }


  return (
    <div>
      <Card>
        <CardHeader>
          <Avatar>
            <AvatarImage src={userData.image || "/placeholder-user.jpg"} alt="User Avatar" />
            <AvatarFallback>{userData.name?.[0]}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
