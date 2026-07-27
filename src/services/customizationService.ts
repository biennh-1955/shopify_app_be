import { AppDataSource } from '../data-source';
import { Shop } from '../entities/Shop';
import { Customization } from '../entities/Customization';
import { UpdateCustomizationDto } from '../dtos/customizationDto';

const shopRepo = () => AppDataSource.getRepository(Shop);
const customizationRepo = () => AppDataSource.getRepository(Customization);

export const upsertCustomization = async (
  shopify_domain: string,
  dto: UpdateCustomizationDto,
) => {
  const shop = await shopRepo().findOneBy({ shopify_domain });
  if (!shop) throw new Error('SHOP_NOT_FOUND');

  let customization = await customizationRepo().findOneBy({ shop_id: shop.id });

  if (!customization) {
    customization = customizationRepo().create({ shop_id: shop.id, ...dto });
  } else {
    Object.assign(customization, dto);
  }

  return customizationRepo().save(customization);
};