// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this path as needed

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get the server session to verify the request
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    
    // Add validation for the ID
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    console.log("Fetching user data for ID:", id);
    
    const user = await prisma.user.findUnique({
      where: { id :parseInt(id)},
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        // Add other fields you want to return
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Error fetching user data" }, { status: 500 });
  }
}