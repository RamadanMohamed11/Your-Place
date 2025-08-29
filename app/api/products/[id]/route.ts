import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Product, SellHistory } from '@/lib/database';

interface Params {
  id: string;
}

// GET a single product by ID
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// UPDATE a product by ID
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// DELETE a product by ID
// SELL a product by ID (using POST for this action)
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();
    const { quantityToSell } = await request.json();
    const { id } = params;

    if (!quantityToSell || quantityToSell <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid quantity' }, { status: 400 });
    }

    const session = await Product.startSession();
    session.startTransaction();

    try {
      const product = await Product.findById(id).session(session);

      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
      }

      if (product.quantity < quantityToSell) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ success: false, message: 'Not enough stock' }, { status: 400 });
      }

      product.quantity -= quantityToSell;
      await product.save({ session });

      const sale = new SellHistory({
        product: product._id,
        quantitySold: quantityToSell,
        priceAtSale: product.price,
      });
      await sale.save({ session });

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({ success: true, product });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
