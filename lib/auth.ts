import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB, { AdminUser } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const DEFAULT_ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number, username: string): string => {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const createAdminUser = async (username?: string, password?: string) => {
  await connectDB();
  const adminUsername = username || DEFAULT_ADMIN_USERNAME;
  const adminPassword = password || DEFAULT_ADMIN_PASSWORD;
  
  const hashedPassword = await hashPassword(adminPassword);
  const newUser = new AdminUser({ username: adminUsername, password: hashedPassword });
  return await newUser.save();
};

export const authenticateAdmin = async (username: string, password: string) => {
  await connectDB();
  const user = await AdminUser.findOne({ username });

  if (!user) {
    return null;
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return null;
  }

  return { id: user._id.toString(), username: user.username };
};