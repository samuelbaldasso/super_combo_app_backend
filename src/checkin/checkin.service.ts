import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckIn } from './entities/checkin.entity';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(CheckIn)
    private checkinRepository: Repository<CheckIn>,
  ) { }

  async create(createCheckInDto: CreateCheckInDto, user: User) {
    const checkin = this.checkinRepository.create({
      ...createCheckInDto,
      user_id: user.id,
      status: 'active',
      check_in_time: new Date(),
    });
    return this.checkinRepository.save(checkin);
  }
}
