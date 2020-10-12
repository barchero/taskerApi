import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {WorkOrdersService} from '../services/workOrders.service';
import {JwtGuard} from '@ui/auth/guards/jwt';

@Controller('work-orders')
export class WorkOrdersController {
    constructor(private readonly workOrdersService: WorkOrdersService) {
    }

    @UseGuards(JwtGuard)
    @Get('list')
    async list() {
        return this.workOrdersService.listWorkOrders();
    }

    @UseGuards(JwtGuard)
    @Get('list/open')
    async listOpen() {
        return this.workOrdersService.listOpenWorkOrders();
    }

    @UseGuards(JwtGuard)
    @Get('detail/:id')
    async detail(@Param() params){
        const id = params.id;
        return this.workOrdersService.getWorkOrderById(id);
    }

}
