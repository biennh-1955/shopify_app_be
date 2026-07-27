import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateCustomizationDto } from '../dtos/customizationDto';
import { upsertCustomization } from '../services/customizationService';

export const updateCustomizationController = async (req: Request, res: Response) => {
  const dto = plainToInstance(UpdateCustomizationDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  try {
    const customization = await upsertCustomization(req.shopify_domain as string, dto);
    return res.status(200).json({ success: true, data: customization });
  } catch (err: any) {
    if (err.message === 'SHOP_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};