import { AppDataSource } from '../data-source';
import { Shop } from '../entities/Shop';
import { Customization } from '../entities/Customization';
import { shopRepo } from '../repository/shopRepository';
import { customizationRepo } from '../repository/customizationRepository';

export const createShop = async (shopify_domain: string, shop_owner: string) => {
  const existing = await shopRepo().findOneBy({ shopify_domain });
  if (existing) {
    throw new Error('SHOP_ALREADY_EXISTS');
  }

  const shop = shopRepo().create({ shopify_domain, shop_owner });
  await shopRepo().save(shop);

  // tự tạo customization mặc định cho shop mới — tránh null check rải rác
  const customization = customizationRepo().create({ shop_id: shop.id });
  await customizationRepo().save(customization);

  return shop;
};

export const getShopByDomain = async (shopify_domain: string) => {
  const shop = await shopRepo().findOne({
    where: { shopify_domain },
    relations: ['customization', 'translations'],
  });
  if (!shop) throw new Error('SHOP_NOT_FOUND');
  return shop;
};