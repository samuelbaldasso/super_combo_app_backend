import { Restaurant } from './restaurant.entity';
export declare class Product {
    id: string;
    restaurant_id: string;
    restaurant: Restaurant;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    is_available: boolean;
    allergens: string[];
}
