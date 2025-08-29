import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import connectDB, { Product, RepairService, RepairRequest, SellHistory } from '@/lib/database';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fetch = searchParams.get('fetch');
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    if (fetch === 'history') {
      const history = await SellHistory.find({}).populate('product', 'name image').sort({ createdAt: -1 });
      return NextResponse.json({ success: true, history });
    }

    // Get dashboard statistics
    const [
      totalProducts,
      totalServices,
      pendingRequests,
      completedRequests,
      recentRequests
    ] = await Promise.all([
      Product.countDocuments(),
      RepairService.countDocuments(),
      RepairRequest.countDocuments({ status: 'pending' }),
      RepairRequest.countDocuments({ status: 'completed' }),
      RepairRequest.find().sort({ createdAt: -1 }).limit(10)
    ]);

    const stats = {
      totalProducts,
      totalServices,
      pendingRequests,
      completedRequests
    };

    return NextResponse.json({
      stats,
      recentRequests
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    await SellHistory.deleteMany({});
    return NextResponse.json({ success: true, message: 'Sales history cleared successfully' });

  } catch (error) {
    console.error('Clear history error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}