import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {WorkOrdersService} from '../services/workOrders.service';
import {JwtGuard} from '@ui/auth/guards/jwt';
import {RolesGuard} from '@ui/auth/guards/roles';
import {RolesEnum} from '@domain/auth/enums/RolesEnum';
import {QueryList} from '@domain/workOrders/entities/QueryList';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';

@Controller('work-orders')
export class WorkOrdersController {
    constructor(private readonly workOrdersService: WorkOrdersService) {
    }

    @UseGuards(JwtGuard, new RolesGuard([RolesEnum.ADMIN]))
    @Post('list')
    async list(@Body() body: QueryList<ShortWorkOrder>) {
        return this.workOrdersService.listShortWorkOrders(body);
    }

    @UseGuards(JwtGuard)
    @Get('detail/:id')
    async detail(@Param() params){
        const id = params.id;
        return this.workOrdersService.getWorkOrderById(id);
    }

}
