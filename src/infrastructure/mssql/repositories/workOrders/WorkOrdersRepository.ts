import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {Repository} from 'typeorm';
import {Worker} from '@domain/workOrders/entities/Worker';
import {Client} from '@domain/workOrders/entities/Client';

export class WorkOrdersRepositoryImpl implements WorkOrdersRepository {
    constructor(
        private workOrderRepository: Repository<WorkOrder>,
        private workerRepository: Repository<Worker>,
        private clientRepository: Repository<Client>) {
    }

    private async setEndWorker(workOrder: WorkOrder){
        workOrder.endWorker = await this.workerRepository.findOne({id: workOrder.endWorkerCode});
    }

    private async setStartWorker(workOrder: WorkOrder){
        workOrder.startWorker = await this.workerRepository.findOne({id: workOrder.startWorkerCode});
    }

    private async setClient(workOrder: WorkOrder){
        workOrder.client = await this.clientRepository.findOne({id: workOrder.clientCode});
    }

    async getWorkOrderById(id: string): Promise<WorkOrder> {

        const workOrder = await this.workOrderRepository
            .createQueryBuilder('workOrder')
            .where('workOrder.codigo LIKE :id', {id: '%'+id})
            .orderBy('workOrder.codigo', 'ASC')
            .getOne();

        await this.setEndWorker(workOrder);
        await this.setStartWorker(workOrder);
        await this.setClient(workOrder);

        return workOrder;
    }

    async listOpenWorkOrders(): Promise<WorkOrder[]> {
        const workOrders = await this.workOrderRepository.find({where: {done: false}});

        for (const workOrder of workOrders) {
            await this.setClient(workOrder);
        }

        return workOrders;
    }

    async listWorkOrders(): Promise<WorkOrder[]> {
        const workOrders = await this.workOrderRepository.find({take: 100});

        for (const workOrder of workOrders) {
            await this.setClient(workOrder);
        }

        return workOrders;
    }

}
