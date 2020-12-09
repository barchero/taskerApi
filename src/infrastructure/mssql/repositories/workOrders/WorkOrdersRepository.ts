import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {Repository} from 'typeorm';
import {PaginationRepository} from '@domain/pagination/repositories/PaginationRepository';

export class WorkOrdersRepositoryImpl implements WorkOrdersRepository {
    constructor(
        private workOrderRepository: Repository<WorkOrder>,
        private paginationRepository: PaginationRepository) {
    }

    async getWorkOrderById(id: string): Promise<WorkOrder> {

        return await this.workOrderRepository
            .createQueryBuilder('workOrder')
            .leftJoinAndSelect( 'workOrder.client', 'client')
            .leftJoinAndSelect('workOrder.startWorker', 'startWorker')
            .leftJoinAndSelect('workOrder.endWorker', 'endWorker')
            .where('workOrder.codigo LIKE :id', {id: '%' + id})
            .orderBy('workOrder.codigo', 'ASC')
            .getOne();
    }

}
