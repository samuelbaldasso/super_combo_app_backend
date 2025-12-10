import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async findAll(query: any) {
    const { lat, lng, radius, category, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const qb = this.restaurantRepository.createQueryBuilder('restaurant');

    if (lat && lng && radius) {
      // Haversine formula
      // 6371 km earth radius
      qb.addSelect(
        `(6371 * acos(cos(radians(:lat)) * cos(radians(restaurant.latitude)) * cos(radians(restaurant.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(restaurant.latitude))))`,
        'distance',
      )
        .having('distance < :radius')
        .setParameter('lat', lat)
        .setParameter('lng', lng)
        .setParameter('radius', radius)
        .orderBy('distance', 'ASC');
    }

    if (category) {
      qb.andWhere(':category = ANY(restaurant.categories)', { category });
    }

    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async findMenu(id: string) {
    const restaurant = await this.findOne(id);
    const products = await this.productRepository.find({ where: { restaurant_id: id } });

    // Group by category
    const categoriesMap = new Map<string, Product[]>();
    products.forEach((p) => {
      if (!categoriesMap.has(p.category)) {
        categoriesMap.set(p.category, []);
      }
      categoriesMap.get(p.category)!.push(p);
    });

    const categories: { name: string; items: Product[] }[] = [];
    categoriesMap.forEach((items, name) => {
      categories.push({ name, items });
    });

    return { categories };
  }
}
