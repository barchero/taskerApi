import {Injectable} from '@nestjs/common';
import {WorkOrdersRepository} from '../../../domain/workOrders/repositories/WorkOrdersRepository';
import {WorkOrdersRepositoryImpl} from '../../../infrastructure/mssql/repositories/workOrders/WorkOrdersRepository';
import {ShortWorkOrder} from '../../../domain/workOrders/entities/ShortWorkOrder';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {ConnectionsEnum} from '../../../infrastructure/mssql/enums/ConnectionsEnum';

@Injectable()
export class WorkOrdersService {
    private readonly workOrdersRepository: WorkOrdersRepository;
    constructor(
        @InjectEntityManager(ConnectionsEnum.DATABASE_SERVE0PM)
        private workOrderEntityManager: EntityManager,
        @InjectEntityManager(ConnectionsEnum.DATABASE_GROUP0001)
        private workerEntityManager: EntityManager,
    ) {
        this.workOrdersRepository = new WorkOrdersRepositoryImpl(workOrderEntityManager, workerEntityManager);
    }

    async listWorkOrders(): Promise<ShortWorkOrder[]> {
        return this.workOrdersRepository.listWorkOrders();
    }
}
