import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateShopDto } from '../dtos/shopDto';
import { createShop, getShopByDomain } from '../services/shopService';
import { signToken } from '../utils/jwt';

export const createShopController = async (req: Request, res: Response) => {
  const dto = plainToInstance(CreateShopDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  try {
    const shop = await createShop(dto.shopify_domain, dto.shop_owner);
    const token = signToken(shop.shopify_domain); // trả token luôn để FE lưu lại dùng
    return res.status(201).json({ success: true, data: shop, token });
  } catch (err: any) {
    if (err.message === 'SHOP_ALREADY_EXISTS') {
      return res.status(409).json({ success: false, message: 'Shop already exists' });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getShopController = async (req: Request, res: Response) => {
  try {
    const shop = await getShopByDomain(req.shopify_domain as string);
    return res.status(200).json({ success: true, data: shop });
  } catch (err: any) {
    if (err.message === 'SHOP_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};