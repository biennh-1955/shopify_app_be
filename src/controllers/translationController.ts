import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TranslationDto } from '../dtos/translationDto';
import {
  createTranslation, deleteTranslation, updateTranslation,
} from '../services/translationService';

const validateDto = async (body: any) => {
  const dto = plainToInstance(TranslationDto, body);
  const errors = await validate(dto);
  return { dto, errors };
};

export const createTranslationController = async (req: Request, res: Response) => {
  const { dto, errors } = await validateDto(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  try {
    const translation = await createTranslation(req.shopify_domain!, dto);
    return res.status(201).json({ success: true, data: translation });
  } catch (err: any) {
    if (err.message === 'LOCALE_ALREADY_EXISTS') {
      return res.status(409).json({ success: false, message: 'Locale already exists' });
    }
    if (err.message === 'SHOP_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteTranslationController = async (req: Request, res: Response) => {
  const locale = Array.isArray(req.params.locale) ? req.params.locale[0] : req.params.locale;

  try {
    const result = await deleteTranslation(req.shopify_domain!, locale);
    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    if (err.message === 'LOCALE_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Locale not found' });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateTranslationController = async (req: Request, res: Response) => {
  const { dto, errors } = await validateDto(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  try {
    const translation = await updateTranslation(req.shopify_domain!, dto);
    return res.status(200).json({ success: true, data: translation });
  } catch (err: any) {
    if (err.message === 'LOCALE_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Locale not found' });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};