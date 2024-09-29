// app/api/signup/route.ts

import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';// Adjust the import according to your prisma client location
import { NextResponse } from 'next/server'; // Use Next.js 14's NextResponse for handling responses

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;

  // Basic input validation
  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await Prisma.Employee.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
