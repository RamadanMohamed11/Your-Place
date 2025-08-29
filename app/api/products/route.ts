import { NextRequest, NextResponse } from 'next/server';
import connectDB, { Product, Category, SellHistory } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Check if we are creating a category
    if (body.isCategory) {
      const { name } = body;
      if (!name) {
        return NextResponse.json({ success: false, message: 'Category name is required' }, { status: 400 });
      }
      const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (existingCategory) {
        return NextResponse.json({ success: false, message: 'Category already exists' }, { status: 409 });
      }
      const category = await Category.create({ name });
      return NextResponse.json({ success: true, category }, { status: 201 });
    }

    // Otherwise, create a product
    const { name, price, category, description, image, quantity } = body;
    if (!name || !price || !category || quantity === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }
    const product = await Product.create({ name, price, category, description, image, quantity });
    return NextResponse.json({ success: true, product }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fetch = searchParams.get('fetch');

  try {
    await connectDB();

    if (fetch === 'categories') {
      const categoryCount = await Category.countDocuments();
      if (categoryCount === 0) {
        // Seed database with default categories
        const defaultCategories = [
          { name: 'Phone Cases' },
          { name: 'Chargers' },
          { name: 'Screen Protectors' },
          { name: 'Earphones' },
          { name: 'Power Banks' },
          { name: 'Cables' },
          { name: 'Other' },
        ];
        await Category.insertMany(defaultCategories);
      }
      const categories = await Category.find({}).sort({ name: 1 });
      return NextResponse.json({ success: true, categories });
    }

    if (fetch === 'history') {
      const date = searchParams.get('date');
      const query: any = {};

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        query.createdAt = {
          $gte: startOfDay,
          $lte: endOfDay,
        };
      }

      const history = await SellHistory.find(query).populate('product', 'name').sort({ createdAt: -1 });
      return NextResponse.json({ success: true, history }, { status: 200 });
    }

    const products = await Product.find({});
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const historyId = searchParams.get('historyId');
    const categoryId = searchParams.get('categoryId');

    if (historyId) {
      const deletedHistory = await SellHistory.findByIdAndDelete(historyId);
      if (!deletedHistory) {
        return NextResponse.json({ success: false, message: 'History record not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'History record deleted successfully' }, { status: 200 });
    }

    if (categoryId) {
      const categoryToDelete = await Category.findById(categoryId);
      if (!categoryToDelete) {
        return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
      }

      const productInCategory = await Product.findOne({ category: categoryToDelete.name });
      if (productInCategory) {
        return NextResponse.json({ success: false, message: 'Category is in use and cannot be deleted.' }, { status: 400 });
      }

      await Category.findByIdAndDelete(categoryId);
      return NextResponse.json({ success: true, message: 'Category deleted successfully' });
    }

    return NextResponse.json({ success: false, message: 'Either historyId or categoryId is required' }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
