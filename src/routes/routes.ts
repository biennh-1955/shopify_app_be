import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createShopController, getShopController } from '../controllers/shopController';
import { updateCustomizationController } from '../controllers/customizationController';
import { createTranslationController, deleteTranslationController, updateTranslationController } from '../controllers/translationController';

const router = Router();

// router shop
router.post('/', createShopController); // tạo shop không cần token (chưa có token lúc này)
router.get('/', authMiddleware, getShopController);

// router customization
router.put('/customization', authMiddleware, updateCustomizationController);

// router translation
router.post('/translation', authMiddleware, createTranslationController);
router.delete('/translation/:locale', authMiddleware, deleteTranslationController);
router.put('/translation/:locale', authMiddleware, updateTranslationController);

export default router;
