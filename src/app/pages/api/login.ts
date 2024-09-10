import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Here you can handle your backend logic (e.g., authentication, database lookup)

  if (email === 'test@example.com' && password === 'password123') {
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
