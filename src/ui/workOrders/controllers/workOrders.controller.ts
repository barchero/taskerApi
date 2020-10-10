import {Controller, Get, UseGuards} from '@nestjs/common';
import {WorkOrdersService} from '../services/workOrders.service';
import {JwtGuard} from '../../auth/guards/jwt';

@Controller('work-orders')
export class WorkOrdersController {
    constructor(private readonly workOrdersService: WorkOrdersService) {}

    @UseGuards(JwtGuard)
    @Get('list')
    async list(){
        return this.workOrdersService.listWorkOrders();
    }

}
