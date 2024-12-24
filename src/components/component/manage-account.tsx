import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AccountDetail() {
  const { data: session, status } = useSession(); // Get session info
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // Fetch user details using the user id from the session
      const fetchUserDetails = async () => {
        setLoading(true);
        setError(null); // Reset error before fetching
        console.log(session?.user?.id);
        try {
          // Fetch data using the user ID from session
          const response = await fetch(`/User/${session.user.id}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          setUserData(data.user); // Set the user data
        } catch (error) {
          console.error("Error fetching user details:", error);
          setError("Error fetching user data");
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [status, session]); // Re-run when session changes

  // Handle loading, error, or no session states
  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!session || !userData) {
    return <div>You must be logged in to view this page.</div>;
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
