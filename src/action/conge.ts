"use server"

import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { hash } from "bcrypt-ts";

export async function createConge(data: FormData) {
  console.log(data)
  const cin = data.get('cin');
  const password = data.get('password') ;
  const name = data.get('name');
  const gender = data.get('gender') ;
  const phone_number = data.get('phone_number') ;
  const email = data.get('email') ;
  const grade = data.get('grade') ;
 
  // Hash the password using bcrypt
  const passwordHash = await hash(password?.toString() ?? '', 10);

  // Create a new user in the database
  const user = await prisma.user.create({
    data: {
      cin: cin as unknown as string,
      password: passwordHash as string,
      name: name as string,
      gender: gender as string,
      phone_number: phone_number as string,
      email: email as string,
      grade: grade as string,
    }
  });
  console.log(user)
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