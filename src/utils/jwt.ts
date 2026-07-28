import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

// kiem tra SECRET_KEY có ton tai trong .env hay không
if (!SECRET_KEY) {
  throw new Error('Missing SECRET_KEY in environment variables. Please check your .env file.');
}

// đăng ký 1 token
export const signToken = (shopify_domain: string): string => {
  return jwt.sign({ shopify_domain }, SECRET_KEY, { expiresIn: '7d' });
};

// kiểm tra token
export const verifyToken = (token: string): { shopify_domain: string } => {
  return jwt.verify(token, SECRET_KEY) as { shopify_domain: string };
};