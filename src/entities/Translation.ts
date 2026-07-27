import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, Unique,
} from 'typeorm';
import { Shop } from './Shop';

interface TranslateContent {
  placeholder_text: string;
  button_text: string;
}

@Entity('translation')
@Unique(['shop_id', 'locale'])
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  locale: string;

  @Column({ type: 'json' })
  translate: TranslateContent;

  @Column()
  shop_id: string;

  @ManyToOne(() => Shop, (shop) => shop.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}