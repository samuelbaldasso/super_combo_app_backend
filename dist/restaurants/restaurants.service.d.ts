import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Product } from './entities/product.entity';
export declare class RestaurantsService {
    private restaurantRepository;
    private productRepository;
    constructor(restaurantRepository: Repository<Restaurant>, productRepository: Repository<Product>);
    findAll(query: any): Promise<{
        data: Restaurant[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
    }>;
    findOne(id: string): Promise<Restaurant>;
    findMenu(id: string): Promise<{
        categories: {
            name: string;
            items: Product[];
        }[];
    }>;
}
