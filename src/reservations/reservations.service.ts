import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) { }

  async create(createReservationDto: CreateReservationDto, user: User) {
    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      user_id: user.id,
      status: 'pending',
    });
    return this.reservationRepository.save(reservation);
  }

  async findByUser(user: User, page: number = 1, limit: number = 20) {
    const [data, total] = await this.reservationRepository.findAndCount({
      where: { user_id: user.id },
      relations: ['restaurant'],
      skip: (page - 1) * limit,
      take: limit,
      order: { date_time: 'DESC' },
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async cancel(id: string, user: User) {
    const reservation = await this.reservationRepository.findOne({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');
    if (reservation.user_id !== user.id) {
      throw new ForbiddenException('Not your reservation');
    }

    reservation.status = 'cancelled';
    return this.reservationRepository.save(reservation);
  }
}
