import { Reservation } from '../../reservations/entities/reservation.entity';
import { Order } from '../../orders/entities/order.entity';
import { CheckIn } from '../../checkin/entities/checkin.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    photo_url: string;
    created_at: Date;
    updated_at: Date;
    reservations: Reservation[];
    orders: Order[];
    checkins: CheckIn[];
}
