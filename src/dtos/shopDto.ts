import { IsString, IsNotEmpty } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  shopify_domain: string;

  @IsString()
  @IsNotEmpty()
  shop_owner: string;
}