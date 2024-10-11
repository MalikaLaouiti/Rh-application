"use server"

import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { hash } from "bcrypt-ts";


export async function createUser(data: FormData) {
  const email = data.get('email') ;
  const password = data.get('password') ;
  const grade = data.get('grade');

  // Hash the password using bcrypt
  const passwordHash = await hash(password?.toString() ?? '', 10);

  // Create a new user in the database
  const user = await prisma.user.create({
    data: {
      email: email as string,
      password: password as string, 
      grade: grade as string
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

// READ: Get all employees
export async function getAllEmployees() {
  const employees = await prisma.user.findMany({
    select: {
      id: true,
      cin: true,
      name: true,
      email: true,
      grade: true,
      department_id: true,
    },
  });
  return employees.map(employee => ({
    ...employee,
    cin: employee.cin!, // Assert non-null value
    department_id: employee.department_id!, // Assert non-null value
    name: employee.name!, // Assert non-null value
    grade: employee.grade!, // Assert non-null value
  }));
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

// export async function createDemandeConge(data: FormData) {
//   const employeeId = data.get('employeeId') as string;
//   const startDate = data.get('startDate') as string;
//   const endDate = data.get('endDate') as string;
//   const leaveType = data.get('leaveType')as string;
//   const reason = data.get('reason') as string;
//   const userId = data.get('userId') as number; // User who is requesting

//   // You may want to validate the input data here (e.g., checking valid dates, leave type, etc.)
//   if (!employeeId || !startDate || !endDate || !leaveType) {
//     throw new Error("Required fields are missing");
//   }

//   // Create a new leave request (DemandeConge) in the database
//   const demandeConge = await prisma.demandeConge.create({
//     data: {
//       employeeId: parseInt(employeeId ),  // Ensure it's an integer
//       startDate: new Date(startDate ),    // Convert string to Date
//       endDate: new Date(endDate),        // Convert string to Date
//       leaveType: leaveType ,
//       reason: reason  ,     // Optional reason field
//       userId: userId  ,   // Optional userId field if applicable
//       status: 'Pending'                           // Default status
//     },
//   });

//   // Check if the creation was successful
//   if (demandeConge) {
//     console.log("La demande de conge est crée");
//   } else {
//     console.log("La demande de conge n'est pas crée");
//   }

//   return demandeConge;
// }
