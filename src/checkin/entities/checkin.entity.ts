import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity('checkins')
export class CheckIn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.checkins)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.checkins)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column({ nullable: true })
  reservation_id: string;

  @Column({ nullable: true })
  order_id: string;

  @CreateDateColumn()
  check_in_time: Date;

  @Column({ default: 'active' })
  status: string;
}
