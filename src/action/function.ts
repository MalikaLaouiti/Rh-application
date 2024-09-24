"use server";
import { PrismaClient, Prisma } from '@prisma/client';
import { db } from "@/action/database";
import {
  Employee,
  Conge,
  Department,
  DemandeConge,
  Document
} from "@prisma/client";

export async function getAllUsers() {
  try {
    const users = await db.employee.findMany();
    return { users };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}
export async function createAccount(userData: Prisma.EmployeeCreateInput) {
  try {
    const user = await db.employee.create({
      data: userData,
    });
    if (!user) {
      return { Error: "Error creating user" };
    }
    return { Response: { message: "User Created", user } };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Cas de l'erreur 'P2002' qui survient en cas de duplication de clé unique
      if (error.code === 'P2002') {
        return { Error: `Duplicate field: ${error.meta?.target}` };
      }
    }
    
    return { Error: error?.message || "An unexpected error occurred" };
  }
}
export async function getUserById(userId: number) {
  try {
    const user = await db.employee.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return { Error: "User not found" };
    }

    return { user };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}
export async function updateUser(userId: number, updatedData: Prisma.EmployeeUpdateInput) {
  try {
    const user = await db.employee.update({
      where: { id: userId },
      data: updatedData,
    });

    return { Response: { message: "User Updated", user } };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { Error: "User not found" };
      }
    }
    return { Error: error?.message || "An unexpected error occurred" };
  }
}
export async function deleteUser(userId: number) {
  try {
    const user = await db.employee.delete({
      where: { id: userId },
    });

    return { Response: { message: "User Deleted", user } };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { Error: "User not found" };
      }
    }
    return { Error: error?.message || "An unexpected error occurred" };
  }
}
