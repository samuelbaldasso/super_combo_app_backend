import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('CheckIn')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) { }

  @Post()
  @ApiOperation({ summary: 'Check in' })
  create(@Body() createCheckInDto: CreateCheckInDto, @Request() req: any) {
    return this.checkinService.create(createCheckInDto, req.user);
  }
}
