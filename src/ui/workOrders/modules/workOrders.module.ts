import {Module} from '@nestjs/common';
import {WorkOrdersController} from '../controllers/workOrders.controller';
import {WorkOrdersService} from '../services/workOrders.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {WorkOrderImpl} from '@infrastructure/mssql/entities/WorkOrder';
import {ConnectionsEnum} from '@infrastructure/mssql/enums/ConnectionsEnum';
import {WorkerImpl} from '@infrastructure/mssql/entities/Worker';
import {MssqlModule} from '@infrastructure/mssql/mssqlModule';


@Module({
    imports: [
        MssqlModule,
        TypeOrmModule.forFeature([WorkOrderImpl], ConnectionsEnum.DATABASE_SERVE0PM),
        TypeOrmModule.forFeature([WorkerImpl], ConnectionsEnum.DATABASE_GROUP0001)
    ],
    controllers: [WorkOrdersController],
    providers: [WorkOrdersService]
})
export class WorkOrdersModule {
}
