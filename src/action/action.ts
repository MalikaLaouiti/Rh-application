"use server";

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { FormState, LoginFormSchema, SignupFormSchema } from '@/app/auth/definitions';
import { createSession, deleteSession } from '@/app/auth/02-stateless-session';

const prisma = new PrismaClient();

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      cin: formData.get('cin'),  // New field for 'cin'
      date_of_birth: formData.get('date_of_birth'),  // New field for 'date_of_birth'
      job_title: formData.get('job_title'),  // New field for 'job_title'
      hire_date: formData.get('hire_date'),  // New field for 'hire_date'
    });
  
    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }
  
    const { name, email, password, cin, date_of_birth, job_title, hire_date } = validatedFields.data;
  
    // 2. Check if the user's email already exists
    const existingUser = await prisma.employee.findUnique({
      where: { email },
    });
  
    if (existingUser) {
      return { message: 'Email already exists, please use a different email or login.' };
    }
  
    // 3. Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // 4. Insert the employee into the database
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cin,  // New field for 'cin'
        date_of_birth: new Date(date_of_birth),  // Ensure date is stored as Date
        job_title,  // New field for 'job_title'
        hire_date: new Date(hire_date),  // Ensure hire date is stored as Date
      },
    });
  
    if (!employee) {
      return { message: 'An error occurred while creating your account.' };
    }
  
    // 5. Create a session for the employee
    await createSession(employee.cin.toString());
  
    return { message: 'Account created successfully!' };
  }

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const errorMessage = { message: 'Invalid login credentials.' };

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  // 2. Query the database for the user with the given email
  const user = await prisma.employee.findUnique({
    where: { email },
  });

  if (!user) {
    return errorMessage;
  }

  // 3. Compare the password with the hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. Create a session for the user
  await createSession(user.cin.toString());

  return { message: 'Login successful!' };
}

export async function logout() {
  await deleteSession();
}
