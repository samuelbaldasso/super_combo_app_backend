import { User } from '../../auth/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare class CheckIn {
    id: string;
    user_id: string;
    user: User;
    restaurant_id: string;
    restaurant: Restaurant;
    reservation_id: string;
    order_id: string;
    check_in_time: Date;
    status: string;
}
