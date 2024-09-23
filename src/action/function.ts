"use server";

import { db } from "@/action/database";
import {
  Employee,
  Conge,
  Department,
  DemandeConge,
  Document
} from "@prisma/client";
// import { error } from "console";
import { revalidatePath } from "next/cache";
// import { Result } from "postcss";

export async function createAccount(User: Employee) {
  try {
    const user = await db.employee.create({
      data: User
    });
    if (!user) throw new Error("Error creating user: " + user);
    // revalidatePath("/viewdata/stocks");
    return { Response: { message: "User Created" } };
  } 
  catch (error: any) {
    return { Error: error?.message };
  }
}

export async function updateUsers(User: Employee[]) {
  const updatePromises = User.map((User) =>
    db.employee.update({
      where: { id: User.id },
      data: {
        ...User,
      },
    })
  );
  try {
    const User = await Promise.all(updatePromises);
    if (!User) throw new Error("Error updating user");
    // revalidatePath("/viewdata/stocks");
    return { Response: { message: "User Updated" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}