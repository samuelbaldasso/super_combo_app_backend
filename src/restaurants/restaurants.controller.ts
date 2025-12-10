import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Get()
  @ApiOperation({ summary: 'List restaurants' })
  @ApiQuery({ name: 'lat', required: false })
  @ApiQuery({ name: 'lng', required: false })
  @ApiQuery({ name: 'radius', required: false, description: 'Radius in km' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query() query: any) {
    return this.restaurantsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant details' })
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Get(':id/menu')
  @ApiOperation({ summary: 'Get restaurant menu' })
  findMenu(@Param('id') id: string) {
    return this.restaurantsService.findMenu(id);
  }
}
