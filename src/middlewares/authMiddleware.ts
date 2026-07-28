import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // kiêm tra xem header có tồn tại và có đúng định dạng Bearer token hay không
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header' });
  }

  // lấy token từ header, token sẽ có dạng "Bearer <token>", nên cần split để lấy phần token
  const token = authHeader.split(' ')[1];

  // kiểm tra token có hợp lệ hay không
  try {
    const decoded = verifyToken(token);
    req.shopify_domain = decoded.shopify_domain;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};