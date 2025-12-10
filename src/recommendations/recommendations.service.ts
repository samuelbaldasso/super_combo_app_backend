import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) { }

  async getPersonalized(user: User, lat?: number, lng?: number) {
    // Mock personalization: Return top rated restaurants
    // If lat/lng provided, sort by distance too?
    // For now, just return top 10 rated restaurants.

    return this.restaurantRepository.find({
      order: { rating: 'DESC', review_count: 'DESC' },
      take: 10,
    });
  }
}
