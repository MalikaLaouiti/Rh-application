import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma"; // Adjust the path to your prisma instance

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    
    const userId = id; 
    console.log("Fetching user data for ID:", id);
    const user = await prisma.user.findUnique({
      where: { id: userId }, // Now using a number for the query
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user data" }, { status: 500 });
  }
}
