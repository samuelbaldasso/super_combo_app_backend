import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @ApiOperation({ summary: 'Create order' })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get('user')
  @ApiOperation({ summary: 'List user orders' })
  findAll(@Request() req: any, @Query('page') page: number, @Query('limit') limit: number) {
    return this.ordersService.findByUser(req.user, page, limit);
  }
}
