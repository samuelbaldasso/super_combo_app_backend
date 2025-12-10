import { Product } from './product.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Order } from '../../orders/entities/order.entity';
import { CheckIn } from '../../checkin/entities/checkin.entity';
export declare class Restaurant {
    id: string;
    name: string;
    description: string;
    image_url: string;
    address: string;
    latitude: number;
    longitude: number;
    rating: number;
    review_count: number;
    cuisine_type: string;
    categories: string[];
    is_open: boolean;
    opening_hours: string;
    products: Product[];
    reservations: Reservation[];
    orders: Order[];
    checkins: CheckIn[];
}
