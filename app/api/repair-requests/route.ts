import { NextRequest, NextResponse } from 'next/server';
import connectDB, { RepairRequest } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { name, phone, deviceModel, problemDescription } = await request.json();

    if (!name || !phone || !deviceModel || !problemDescription) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const repairRequest = new RepairRequest({
      customer_name: name,
      phone: phone,
      device_model: deviceModel,
      problem_description: problemDescription,
      status: 'pending'
    });

    const result = await repairRequest.save();

    return NextResponse.json({
      message: 'Repair request submitted successfully',
      id: result._id
    }, { status: 201 });

  } catch (error) {
    console.error('Repair request error:', error);
    return NextResponse.json(
      { message: 'Failed to submit repair request' },
      { status: 500 }
    );
  }
}