import { Repository } from 'typeorm';
import { CheckIn } from './entities/checkin.entity';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { User } from '../auth/entities/user.entity';
export declare class CheckinService {
    private checkinRepository;
    constructor(checkinRepository: Repository<CheckIn>);
    create(createCheckInDto: CreateCheckInDto, user: User): Promise<CheckIn>;
}
