import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Recommendations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) { }

  @Get('personalized')
  @ApiOperation({ summary: 'Get personalized recommendations' })
  @ApiQuery({ name: 'lat', required: false })
  @ApiQuery({ name: 'lng', required: false })
  getPersonalized(@Request() req: any, @Query('lat') lat: number, @Query('lng') lng: number) {
    return this.recommendationsService.getPersonalized(req.user, lat, lng);
  }
}
