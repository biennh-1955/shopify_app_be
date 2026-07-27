import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  OneToOne, OneToMany,
} from 'typeorm';
import { Customization } from './Customization';
import { Translation } from './Translation';

@Entity('shop')
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  shopify_domain: string;

  @Column()
  shop_owner: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Customization, (c) => c.shop)
  customization: Customization;

  @OneToMany(() => Translation, (t) => t.shop)
  translations: Translation[];
}