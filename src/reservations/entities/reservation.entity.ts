import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column()
  date_time: Date;

  @Column()
  party_size: number;

  @Column({ default: 'pending' })
  status: string; // pending, confirmed, cancelled

  @Column({ nullable: true })
  special_requests: string;
}
