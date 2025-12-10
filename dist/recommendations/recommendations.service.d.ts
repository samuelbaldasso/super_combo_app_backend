import { Repository } from 'typeorm';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { User } from '../auth/entities/user.entity';
export declare class RecommendationsService {
    private restaurantRepository;
    constructor(restaurantRepository: Repository<Restaurant>);
    getPersonalized(user: User, lat?: number, lng?: number): Promise<Restaurant[]>;
}
