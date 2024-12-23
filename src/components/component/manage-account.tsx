import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";

export default function AccountDetail() {
  // Access session data
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null); // State for user data
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user data based on session id
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // Fetch user data based on the ID from session
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user/${session.user.id}`);
          const data = await response.json();
          if (response.ok) {
            setUserData(data); // Set user data
          } else {
            console.error("Error fetching user data:", data.message);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [session, status]);

  // Handle loading state
  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  // Check if session exists and user data is fetched
  if (!session || !session.user || !userData) {
    return <div>You must be logged in to view this page.</div>;
  }

  const { user } = session;

  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Employee Profile</h1>
          <Button>Edit Profile</Button>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="col-span-1 md:col-span-1">
          <Card>
            <CardHeader>
              <Avatar className="w-16 h-16">
                <AvatarImage src={userData.image || "/placeholder-user.jpg"} alt="Employee Avatar" />
                <AvatarFallback>{userData.name?.[0]}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div>
                <h2 className="text-xl font-bold">{userData.name || "John Doe"}</h2>
                <p className="text-muted-foreground">{userData.jobTitle || "Employee"}</p>
              </div>
              <div>
                <p>{userData.email || "Not Available"}</p>
                <p>{userData.department || "Not Available"}</p>
                <p>{userData.startDate || "Not Available"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Other sections for profile editing, password change, etc. */}
      </main>
    </div>
  );
}
