import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @Post()
  @ApiOperation({ summary: 'Create reservation' })
  create(@Body() createReservationDto: CreateReservationDto, @Request() req: any) {
    return this.reservationsService.create(createReservationDto, req.user);
  }

  @Get('user')
  @ApiOperation({ summary: 'List user reservations' })
  findAll(@Request() req: any, @Query('page') page: number, @Query('limit') limit: number) {
    return this.reservationsService.findByUser(req.user, page, limit);
  }

  @Delete(':id/cancel')
  @ApiOperation({ summary: 'Cancel reservation' })
  cancel(@Param('id') id: string, @Request() req: any) {
    return this.reservationsService.cancel(id, req.user);
  }
}
