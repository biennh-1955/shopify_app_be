import { AppDataSource } from '../data-source';
import { Shop } from '../entities/Shop';
import { Translation } from '../entities/Translation';
import { TranslationDto } from '../dtos/translationDto';

const shopRepo = () => AppDataSource.getRepository(Shop);
const translationRepo = () => AppDataSource.getRepository(Translation);

const getShopOrThrow = async (shopify_domain: string) => {
  const shop = await shopRepo().findOneBy({ shopify_domain });
  if (!shop) throw new Error('SHOP_NOT_FOUND');
  return shop;
};

// POST /translation — tạo mới, lỗi nếu locale đã tồn tại
export const createTranslation = async (shopify_domain: string, dto: TranslationDto) => {
  const shop = await getShopOrThrow(shopify_domain);

  const existing = await translationRepo().findOneBy({ shop_id: shop.id, locale: dto.locale });
  if (existing) throw new Error('LOCALE_ALREADY_EXISTS');

  const translation = translationRepo().create({ shop_id: shop.id, ...dto });
  return translationRepo().save(translation);
};

// DELETE /translation/:locale
export const deleteTranslation = async (shopify_domain: string, locale: string) => {
  const shop = await getShopOrThrow(shopify_domain);

  const translation = await translationRepo().findOneBy({ shop_id: shop.id, locale });
  if (!translation) throw new Error('LOCALE_NOT_FOUND');

  await translationRepo().remove(translation);
  return { locale };
};

// POST /translations — update, lỗi nếu locale chưa tồn tại
export const updateTranslation = async (shopify_domain: string, dto: TranslationDto) => {
  const shop = await getShopOrThrow(shopify_domain);

  const translation = await translationRepo().findOneBy({ shop_id: shop.id, locale: dto.locale });
  if (!translation) throw new Error('LOCALE_NOT_FOUND');

  translation.translate = dto.translate;
  return translationRepo().save(translation);
};