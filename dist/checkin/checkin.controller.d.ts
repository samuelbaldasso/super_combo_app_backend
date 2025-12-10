import { CheckinService } from './checkin.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
export declare class CheckinController {
    private readonly checkinService;
    constructor(checkinService: CheckinService);
    create(createCheckInDto: CreateCheckInDto, req: any): Promise<import("./entities/checkin.entity").CheckIn>;
}
