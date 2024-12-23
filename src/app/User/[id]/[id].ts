// pages/api/user/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma"; // Adjust the path to your prisma instance if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Get the user ID from the query (which will be a string)

  // Ensure that the `id` is parsed correctly to a number
  if (typeof id !== "string" || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }, // Fetch user by parsed ID
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
}
