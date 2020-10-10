import {Module} from '@nestjs/common';
import {WorkOrdersController} from '../controllers/workOrders.controller';
import {WorkOrdersService} from '../services/workOrders.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {WorkOrder} from '../../../infrastructure/mssql/entities/WorkOrder';
import {MssqlModule} from '../../../infrastructure/mssql/mssqlModule';
import {Worker} from '../../../infrastructure/mssql/entities/Worker';
import {ConnectionsEnum} from '../../../infrastructure/mssql/enums/ConnectionsEnum';

@Module({
    imports: [
        MssqlModule,
        TypeOrmModule.forFeature([WorkOrder], ConnectionsEnum.DATABASE_SERVE0PM),
        TypeOrmModule.forFeature([Worker], ConnectionsEnum.DATABASE_GROUP0001)
    ],
    controllers: [WorkOrdersController],
    providers: [WorkOrdersService]
})
export class WorkOrdersModule {}
