import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2 })
  delivery_fee: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pending' })
  status: string; // pending, preparing, delivered, cancelled

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
