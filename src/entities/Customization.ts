import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne, JoinColumn,
} from 'typeorm';
import { Shop } from './Shop';

const BORDER_STYLES = [
  'dotted','dashed','solid','double','groove','ridge','inset','outset','none','hidden',
] as const;

@Entity('customization')
export class Customization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  input_width: string;

  @Column({ nullable: true })
  input_height: string;

  @Column({ type: 'enum', enum: BORDER_STYLES, default: 'solid' })
  input_border: string;

  @Column({ nullable: true })
  input_border_radius: string;

  @Column({ nullable: true })
  input_background_color: string;

  @Column({
    type: 'enum',
    enum: ['plain', 'primary', 'secondary', 'tertiary', 'monochromePlain'],
    default: 'primary',
  })
  button_variant: string;

  @Column({ nullable: true })
  border_width: string;

  @Column({ nullable: true })
  border_color: string;

  @Column({ nullable: true })
  button_width: string;

  @Column({ nullable: true })
  button_height: string;

  @Column({ type: 'enum', enum: BORDER_STYLES, default: 'solid' })
  button_border: string;

  @Column({ nullable: true })
  button_background_color: string;

  @Column({ nullable: true })
  button_text_color: string;

  @Column({ type: 'enum', enum: ['vertical', 'horizontal'], default: 'horizontal' })
  direction: string;

  @Column({ type: 'text', nullable: true })
  css: string;

  @Column()
  shop_id: string;

  @OneToOne(() => Shop, (shop) => shop.customization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}