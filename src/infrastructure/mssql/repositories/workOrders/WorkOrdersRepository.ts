import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {Repository} from 'typeorm';

export class WorkOrdersRepositoryImpl implements WorkOrdersRepository {
    constructor(private workOrderRepository: Repository<WorkOrder>) {
    }

    async getWorkOrderById(id: string): Promise<WorkOrder> {
        return this.workOrderRepository
            .createQueryBuilder('workOrder')
            .where('workOrder.codigo LIKE :id', {id: '%'+id})
            .orderBy('workOrder.codigo', 'ASC')
            .getOne();
    }

    async listOpenWorkOrders(): Promise<WorkOrder[]> {
        return this.workOrderRepository.find({where: {done: true}});
    }

    async listWorkOrders(): Promise<WorkOrder[]> {
        return this.workOrderRepository.find({take: 100});
    }

}
