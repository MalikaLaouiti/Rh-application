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
    if (!user) throw new Error("Error creating articles");
    // revalidatePath("/viewdata/stocks");
    return { Response: { message: "Articles Created" } };
  } 
  catch (error: any) {
    return { Error: error?.message };
  }
}

export async function updateArticles(User: Employee[]) {
  const updatePromises = User.map((Article) =>
    db.employee.update({
      where: { id: Article.id },
      data: {
        ...Article,
      },
    })
  );
  try {
    const User = await Promise.all(updatePromises);
    if (!User) throw new Error("Error updating articles");
    revalidatePath("/viewdata/stocks");
    return { Response: { message: "Articles Updated" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}