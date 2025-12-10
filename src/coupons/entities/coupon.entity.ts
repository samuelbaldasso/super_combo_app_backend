import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  discount_percentage: number;

  @Column('decimal', { precision: 10, scale: 2 })
  min_purchase: number;

  @Column()
  expiry_date: Date;

  @Column({ default: true })
  is_active: boolean;
}
