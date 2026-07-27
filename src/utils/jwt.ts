import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

// đăng ký 1 token
export const signToken = (shopify_domain: string): string => {
  return jwt.sign({ shopify_domain }, SECRET_KEY, { expiresIn: '7d' });
};

// kiểm tra token
export const verifyToken = (token: string): { shopify_domain: string } => {
  return jwt.verify(token, SECRET_KEY) as { shopify_domain: string };
};