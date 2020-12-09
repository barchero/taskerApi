import {Module} from '@nestjs/common';
import {WorkOrdersController} from '../controllers/workOrders.controller';
import {WorkOrdersService} from '../services/workOrders.service';
import {MssqlModule} from '@infrastructure/mssql/mssqlModule';

@Module({
    imports: [MssqlModule],
    controllers: [WorkOrdersController],
    providers: [WorkOrdersService]
})
export class WorkOrdersModule {
}
