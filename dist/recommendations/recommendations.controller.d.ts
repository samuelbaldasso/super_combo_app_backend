import { RecommendationsService } from './recommendations.service';
export declare class RecommendationsController {
    private readonly recommendationsService;
    constructor(recommendationsService: RecommendationsService);
    getPersonalized(req: any, lat: number, lng: number): Promise<import("../restaurants/entities/restaurant.entity").Restaurant[]>;
}
