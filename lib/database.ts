import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Augment the NodeJS global type with a `mongoose` property
declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // The MONGODB_URI check at the top of the file ensures this is a string.
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Interfaces
export interface IProduct extends mongoose.Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  quantity: number;
}

export interface IRepairService extends mongoose.Document {
  name: string;
  description?: string;
  price: number;
  duration?: string;
}

export interface IRepairRequest extends mongoose.Document {
  customer_name: string;
  phone: string;
  device_model: string;
  problem_description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

export interface IAdminUser extends mongoose.Document {
  username: string;
  password?: string; // Password might not always be present in query results
}

// Schemas
const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  quantity: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const RepairServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: String },
}, { timestamps: true });

const RepairRequestSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  phone: { type: String, required: true },
  device_model: { type: String, required: true },
  problem_description: { type: String, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const AdminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Models
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const RepairService = mongoose.models.RepairService || mongoose.model('RepairService', RepairServiceSchema);
export const RepairRequest = mongoose.models.RepairRequest || mongoose.model('RepairRequest', RepairRequestSchema);
export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

// Sell History
export interface ISellHistory extends mongoose.Document {
  product: mongoose.Schema.Types.ObjectId;
  quantitySold: number;
  priceAtSale: number;
}

const SellHistorySchema = new mongoose.Schema<ISellHistory>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantitySold: { type: Number, required: true },
  priceAtSale: { type: Number, required: true },
}, { timestamps: true });

export const SellHistory = mongoose.models.SellHistory || mongoose.model('SellHistory', SellHistorySchema);

// Category
export interface ICategory extends mongoose.Document {
  name: string;
}

const CategorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true, unique: true },
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default connectDB;