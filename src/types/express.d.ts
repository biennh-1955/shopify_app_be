import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      shopify_domain?: string;
    }
  }
}

export {};
