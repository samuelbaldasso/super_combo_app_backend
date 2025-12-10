import { User } from '../../auth/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare class Reservation {
    id: string;
    user_id: string;
    user: User;
    restaurant_id: string;
    restaurant: Restaurant;
    date_time: Date;
    party_size: number;
    status: string;
    special_requests: string;
}
