import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, runQuery } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    
    const { name, phone, deviceModel, problemDescription } = await request.json();

    if (!name || !phone || !deviceModel || !problemDescription) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const result = await runQuery(
      'INSERT INTO repair_requests (customer_name, phone, device_model, problem_description) VALUES (?, ?, ?, ?)',
      [name, phone, deviceModel, problemDescription]
    );

    return NextResponse.json({
      message: 'Repair request submitted successfully',
      id: result.id
    }, { status: 201 });

  } catch (error) {
    console.error('Repair request error:', error);
    return NextResponse.json(
      { message: 'Failed to submit repair request' },
      { status: 500 }
    );
  }
}