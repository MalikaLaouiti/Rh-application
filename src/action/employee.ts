"use server"

import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { hash } from "bcrypt-ts";


export async function create(data: FormData) {
  const email = data.get('email') ;
  const password = data.get('password') ;

  // Hash the password using bcrypt
  const passwordHash = await hash(password?.toString() ?? '', 10);

  // Create a new user in the database
  const user = await prisma.user.create({
    data: {
      email: email as string,
      password: passwordHash
    },
  });
  if (user){
      console.log("User created");
  }
  else {
      console.log("Failed to create user");
  }
  return user;
}

// CREATE: Add a new employee
export async function createEmployee(data: Prisma.UserCreateInput) {
  const employee = await prisma.user.create({
    data,
  });
  return employee;
}

// READ: Get all employees
export async function getAllEmployees() {
  const employees = await prisma.user.findMany();
  return employees;
}

// READ: Get an employee by Cin
export async function getEmployeeById(cin: number) {
  const employee = await prisma.user.findUnique({
    where: { cin },
  });
  return employee;
}

// UPDATE: Update an employee's details
export async function updateEmployee(cin: number, data:Prisma.UserCreateInput ) {
  const employee = await prisma.user.update({
    where: { cin },
    data,
  });
  return employee;
}

// DELETE: Remove an employee by Cin
export async function deleteEmployee(cin: number) {
  const employee = await prisma.user.delete({
    where: { cin },
  });
  return employee;
}
