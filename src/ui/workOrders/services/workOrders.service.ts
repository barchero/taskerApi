import {InjectEntityManager} from '@nestjs/typeorm';
import {ConnectionsEnum} from '@infrastructure/mssql/enums/ConnectionsEnum';
import {WorkOrderImpl} from '@infrastructure/mssql/entities/WorkOrder';
import {Injectable} from '@nestjs/common';
import {EntityManager} from 'typeorm';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';
import {WorkOrdersRepositoryImpl} from '@infrastructure/mssql/repositories/workOrders/WorkOrdersRepository';
import {GetWorkOrdersListImpl} from '@application/workOrders/use-cases/getWorkOrdersList';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {WorkerImpl} from '@infrastructure/mssql/entities/Worker';
import {GetWorkOrderByIdImpl} from '@application/workOrders/use-cases/getWorkOrderById';
import {ClientImpl} from '@infrastructure/mssql/entities/Client';
import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {getOpenWorkOrdersListImpl} from '@application/workOrders/use-cases/getOpenWorkOrdersList';


@Injectable()
export class WorkOrdersService {

    private readonly workOrdersRepository: WorkOrdersRepository;

    constructor(
        @InjectEntityManager(ConnectionsEnum.DATABASE_SERVE0PM)
        private databaseServe0pmEntityManager: EntityManager,
        @InjectEntityManager(ConnectionsEnum.DATABASE_GROUP0001)
        private databaseGroup0001EntityManager: EntityManager,
        @InjectEntityManager(ConnectionsEnum.DATABASE_YEARPM)
        private databaseYearpmEntityManager: EntityManager,
    ) {
        this.workOrdersRepository = new WorkOrdersRepositoryImpl(
            databaseServe0pmEntityManager.getRepository(WorkOrderImpl),
            databaseGroup0001EntityManager.getRepository(WorkerImpl),
            databaseYearpmEntityManager.getRepository(ClientImpl),
        );
    }

    async listWorkOrders(): Promise<ShortWorkOrder[]> {
        return new GetWorkOrdersListImpl(this.workOrdersRepository).execute();
    }

    async listOpenWorkOrders(): Promise<WorkOrder[]> {
        return new getOpenWorkOrdersListImpl(this.workOrdersRepository).execute();
    }

    async getWorkOrderById(id: string): Promise<WorkOrder> {
        return new GetWorkOrderByIdImpl(this.workOrdersRepository).execute(id);
    }
}
