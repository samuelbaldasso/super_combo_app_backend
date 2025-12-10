import { RestaurantsService } from './restaurants.service';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    findAll(query: any): Promise<{
        data: import("./entities/restaurant.entity").Restaurant[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/restaurant.entity").Restaurant>;
    findMenu(id: string): Promise<{
        categories: {
            name: string;
            items: import("./entities/product.entity").Product[];
        }[];
    }>;
}
