import { NextRequest, NextResponse } from 'next/server';
import connectDB, { AdminUser } from '@/lib/database';
import { generateToken, authenticateAdmin, createAdminUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if any admin user exists, if not create default one
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      await createAdminUser(); // Uses environment variables for defaults
    }

    const user = await authenticateAdmin(username, password);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken(user.id, user.username);

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}