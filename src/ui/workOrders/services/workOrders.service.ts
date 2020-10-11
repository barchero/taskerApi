import {InjectEntityManager} from '@nestjs/typeorm';
import {ConnectionsEnum} from '@infrastructure/mssql/enums/ConnectionsEnum';
import {WorkOrderImpl} from '@infrastructure/mssql/entities/WorkOrder';
import {Injectable} from '@nestjs/common';
import {EntityManager} from 'typeorm';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';
import {WorkOrdersRepositoryImpl} from '@infrastructure/mssql/repositories/workOrders/WorkOrdersRepository';
import {GetWorkOrdersListImpl} from '@application/workOrders/use-cases/getWorkOrdersList';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {WorkerRepositoryImpl} from '@infrastructure/mssql/repositories/workOrders/WorkerRepository';
import {WorkerImpl} from '@infrastructure/mssql/entities/Worker';
import {GetWorkOrderByIdImpl} from '@application/workOrders/use-cases/getWorkOrderById';



@Injectable()
export class WorkOrdersService {

    constructor(
        @InjectEntityManager(ConnectionsEnum.DATABASE_SERVE0PM)
        private workOrderEntityManager: EntityManager,
        @InjectEntityManager(ConnectionsEnum.DATABASE_GROUP0001)
        private workerEntityManager: EntityManager,
    ) { }

    async listWorkOrders(): Promise<ShortWorkOrder[]> {
        const workOrdersRepository = new WorkOrdersRepositoryImpl(this.workOrderEntityManager.getRepository(WorkOrderImpl));
        return new GetWorkOrdersListImpl(workOrdersRepository).execute();
    }

    async getWorkOrderById(id: string): Promise<WorkOrder> {
        const workOrdersRepository = new WorkOrdersRepositoryImpl(this.workOrderEntityManager.getRepository(WorkOrderImpl));
        const workerRepository = new WorkerRepositoryImpl(this.workerEntityManager.getRepository(WorkerImpl));
        return new GetWorkOrderByIdImpl(workOrdersRepository, workerRepository).execute(id);
    }
}
