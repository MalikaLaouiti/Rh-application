import { useSession } from "next-auth/react";

export default function AccountDetail() {
  const { data: session } = useSession();

  const userId = session?.user?.id; // Get user ID from session
  const userRole = session?.user?.role; // Get user role from session

  return (
    <div>
      <h1>User ID: {userId}</h1>
      <h2>User Role: {userRole}</h2>
    </div>
  );
}