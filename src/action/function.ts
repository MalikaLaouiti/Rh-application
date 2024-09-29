"use server";

import { PrismaClient, Prisma } from '@prisma/client';
import { db } from "@/server/database";

// Employee functions (existing)
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
    return { Response: { message: "User Created", user } };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
      where: { cin: userId },
    });
    return user ? { user } : { Error: "User not found" };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}
export async function updateUser(userId: number, updatedData: Prisma.EmployeeUpdateInput) {
  try {
    const user = await db.employee.update({
      where: { cin: userId },
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
      where: { cin: userId },
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

// Conge Functions
export async function createConge(congeData: Prisma.CongeCreateInput) {
  try {
    const conge = await db.conge.create({
      data: congeData,
    });
    return { Response: { message: "Conge Created", conge } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function getCongeById(congeId: number) {
  try {
    const conge = await db.conge.findUnique({
      where: { id: congeId },
    });
    return conge ? { conge } : { Error: "Conge not found" };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function updateConge(congeId: number, updatedData: Prisma.CongeUpdateInput) {
  try {
    const conge = await db.conge.update({
      where: { id: congeId },
      data: updatedData,
    });
    return { Response: { message: "Conge Updated", conge } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function deleteConge(congeId: number) {
  try {
    const conge = await db.conge.delete({
      where: { id: congeId },
    });
    return { Response: { message: "Conge Deleted", conge } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

// Document Functions
export async function createDocument(documentData: Prisma.DocumentCreateInput) {
  try {
    const document = await db.document.create({
      data: documentData,
    });
    return { Response: { message: "Document Created", document } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function getDocumentById(documentId: number) {
  try {
    const document = await db.document.findUnique({
      where: { id: documentId },
    });
    return document ? { document } : { Error: "Document not found" };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function updateDocument(documentId: number, updatedData: Prisma.DocumentUpdateInput) {
  try {
    const document = await db.document.update({
      where: { id: documentId },
      data: updatedData,
    });
    return { Response: { message: "Document Updated", document } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function deleteDocument(documentId: number) {
  try {
    const document = await db.document.delete({
      where: { id: documentId },
    });
    return { Response: { message: "Document Deleted", document } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

// DemandeConge Functions
export async function createDemandeConge(demandeData: Prisma.DemandeCongeCreateInput) {
  try {
    const demande = await db.demandeConge.create({
      data: demandeData,
    });
    return { Response: { message: "DemandeConge Created", demande } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function getDemandeCongeById(demandeId: number) {
  try {
    const demande = await db.demandeConge.findUnique({
      where: { id: demandeId },
    });
    return demande ? { demande } : { Error: "DemandeConge not found" };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function updateDemandeConge(demandeId: number, updatedData: Prisma.DemandeCongeUpdateInput) {
  try {
    const demande = await db.demandeConge.update({
      where: { id: demandeId },
      data: updatedData,
    });
    return { Response: { message: "DemandeConge Updated", demande } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}

export async function deleteDemandeConge(demandeId: number) {
  try {
    const demande = await db.demandeConge.delete({
      where: { id: demandeId },
    });
    return { Response: { message: "DemandeConge Deleted", demande } };
  } catch (error: any) {
    return { Error: error?.message || "An unexpected error occurred" };
  }
}
