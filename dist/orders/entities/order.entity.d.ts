import { User } from '../../auth/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: string;
    user_id: string;
    user: User;
    restaurant_id: string;
    restaurant: Restaurant;
    subtotal: number;
    tax: number;
    delivery_fee: number;
    total: number;
    status: string;
    notes: string;
    items: OrderItem[];
}
