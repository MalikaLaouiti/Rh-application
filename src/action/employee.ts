"use server"

import { prisma } from '@/server/database';
import { Prisma } from '@prisma/client';


// CREATE: Add a new employee
export async function createEmployee(data: Prisma.EmployeeCreateInput) {
  const employee = await prisma.employee.create({
    data,
  });
  return employee;
}

// READ: Get all employees
export async function getAllEmployees() {
  const employees = await prisma.employee.findMany();
  return employees;
}

// READ: Get an employee by Cin
export async function getEmployeeById(cin: number) {
  const employee = await prisma.employee.findUnique({
    where: { cin },
  });
  return employee;
}

// UPDATE: Update an employee's details
export async function updateEmployee(cin: number, data:Prisma.EmployeeCreateInput ) {
  const employee = await prisma.employee.update({
    where: { cin },
    data,
  });
  return employee;
}

// DELETE: Remove an employee by Cin
export async function deleteEmployee(cin: number) {
  const employee = await prisma.employee.delete({
    where: { cin },
  });
  return employee;
}
