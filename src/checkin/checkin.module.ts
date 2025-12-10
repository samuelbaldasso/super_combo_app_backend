import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { CheckIn } from './entities/checkin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn])],
  controllers: [CheckinController],
  providers: [CheckinService],
})
export class CheckinModule { }
