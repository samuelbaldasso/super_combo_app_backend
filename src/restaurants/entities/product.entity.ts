import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  category: string;

  @Column({ default: true })
  is_available: boolean;

  @Column('text', { array: true, default: [] })
  allergens: string[];
}
