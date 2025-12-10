export declare class CreateRestaurantDto {
    name: string;
    description?: string;
    image_url?: string;
    address: string;
    latitude: number;
    longitude: number;
    cuisine_type: string;
    categories?: string[];
    is_open?: boolean;
    opening_hours?: any;
}
