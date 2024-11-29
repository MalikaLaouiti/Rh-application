"use server"

import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { hash } from "bcrypt-ts";
import { User } from 'next-auth';





export async function createUser(data: FormData) {
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

export async function getCountForCurrentMonth() {
  const now = new Date(); // Date actuelle
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Début du mois
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // Fin du mois

  const count = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfMonth, // Plus grand ou égal au début du mois
        lte: endOfMonth,   // Plus petit ou égal à la fin du mois
      },
    },
  });

  return count;
}

  // const address = data.get('address') ;
  // const emergency_contact = data.get('emergency_contact') ;
  // const job_title = data.get('job_title');
  // const department_id = data.get('department_id') ;
  // const manager_id = data.get('manager_id');
  // const hire_date = data.get('hire_date');
  // const salary = data.get('salary') ;
  // const date_of_birth = data.get('date_of_birth') ;
  // const place_of_birth = data.get('place_of_birth') ;
  // const total_leave_balance = data.get('total_leave_balance') ;
  // const remaining_leave_balance = data.get('remaining_leave_balance') ;
  // const education = data.get('education') ;
  // const marital_status = data.get('marital_status') ;
  // const dependents_count = data.get('dependents_count');
  // const disability_status = data.get('disability_status') ;

  //     total_leave_balance: total_leave_balance as unknown as number,
  //     remaining_leave_balance: remaining_leave_balance as unknown as number,
  //     education: education as string,
  //     marital_status: marital_status as string,
  //     dependents_count: dependents_count as unknown as number,
  //     disability_status: disability_status as unknown as boolean,
  //     date_of_birth: date_of_birth as unknown as Date ,
  //     place_of_birth: place_of_birth as string,
  //     address: address as string,
  //     emergency_contact: emergency_contact as string,
  //     job_title: job_title as string,
  //     department_id: department_id as unknown as number,
  //     manager_id: manager_id as unknown as number,
  //     hire_date: hire_date as unknown as Date ,
  //     salary: salary as unknown as number,

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
