"use server"

import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { hash } from "bcrypt-ts";

export async function createDemandeConge(data: FormData) {
  console.log(data);

  const startDate = data.get("startDate");
  const endDate = data.get("endDate");
  const leaveType = data.get("leaveType");
  const reason = data.get("reason");
  const employeeId= prisma.session?.userId;

  if (!startDate || !endDate || !leaveType || !userId) {
    throw new Error("Missing required fields: startDate, endDate, leaveType, or userId");
  }

  // Create a new leave request in the database
  const leaveRequest = await prisma.demandeConge.create({
    data: {
      startDate: new Date(startDate.toString()),
      endDate: new Date(endDate.toString()),
      leaveType: leaveType.toString(),
      reason: reason?.toString() ?? "", // Optional field
      employeeId: parseInt(employeeId.toString(), 10), // Assuming userId is numeric
      
    },
  });

  return leaveRequest;
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
      department: true,
    },
  });
  return employees.map(employee => ({
    ...employee,
    cin: employee.cin!, // Assert non-null value
    name: employee.name!, // Assert non-null value
    grade: employee.grade!, // Assert non-null value
    
  }));
}


// READ: Get an employee by Cin
export async function getEmployeeByCriteria(criteria: { cin?: string; department_id?: number; role?: string }) {
  const employee = await prisma.user.findFirst({
    where: criteria,
  });
  return employee;
}

// UPDATE: Update an employee's details
export async function updateEmployee(cin: string, data: Prisma.UserUncheckedUpdateInput) {
  console.log(data);

  const {
    manager_id,
    department,
    salary,
    total_leave_balance,
    remaining_leave_balance,
    ...otherData
  } = data;

  // Start with the mandatory fields from `otherData`
  const updateData: Prisma.UserUncheckedUpdateInput = {
    ...otherData,
  };

  // Conditionally add fields only if they are defined
  if (salary) updateData.salary = parseFloat(salary as string);
  if (total_leave_balance) updateData.total_leave_balance = parseFloat(total_leave_balance as string);
  if (remaining_leave_balance) updateData.remaining_leave_balance = parseInt(remaining_leave_balance as string, 10);
  if (department) updateData.department = (department as string);
  if (manager_id) updateData.manager_id = parseInt(manager_id as string);

  // Perform the update with the dynamically built data object
  const employee = await prisma.user.update({
    where: { cin },
    data: updateData,
  });

  return employee;
}




// DELETE: Remove an employee by Cin
export async function deleteEmployee(cin: string) {
  const employee = await prisma.user.delete({
    where: { cin },
  });
  return employee;
}