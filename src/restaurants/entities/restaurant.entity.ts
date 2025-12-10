import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Order } from '../../orders/entities/order.entity';
import { CheckIn } from '../../checkin/entities/checkin.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('float', { default: 0 })
  rating: number;

  @Column({ default: 0 })
  review_count: number;

  @Column()
  cuisine_type: string;

  @Column('text', { array: true, default: [] })
  categories: string[];

  @Column({ default: true })
  is_open: boolean;

  @Column({ nullable: true })
  opening_hours: string; // Could be JSON or string

  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations: Reservation[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @OneToMany(() => CheckIn, (checkin) => checkin.restaurant)
  checkins: CheckIn[];
}
