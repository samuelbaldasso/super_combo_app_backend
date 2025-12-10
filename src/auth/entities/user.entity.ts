import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Order } from '../../orders/entities/order.entity';
import { CheckIn } from '../../checkin/entities/checkin.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  photo_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => CheckIn, (checkin) => checkin.user)
  checkins: CheckIn[];
}
