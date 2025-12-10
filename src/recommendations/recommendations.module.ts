import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule { }
