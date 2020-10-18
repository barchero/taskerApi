import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {Repository} from 'typeorm';
import {Worker} from '@domain/workOrders/entities/Worker';
import {Client} from '@domain/workOrders/entities/Client';
import {PaginationRepository} from '@domain/pagination/repositories/PaginationRepository';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {QueryList} from '@domain/workOrders/entities/QueryList';

export class WorkOrdersRepositoryImpl implements WorkOrdersRepository {
    constructor(
        private workOrderRepository: Repository<WorkOrder>,
        private workerRepository: Repository<Worker>,
        private clientRepository: Repository<Client>,
        private paginationRepository: PaginationRepository) {
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

    async listWorkOrders(query: QueryList): Promise<Pagination<WorkOrder>> {
        const workOrders = await this.paginationRepository.paginate<WorkOrder>(
            this.workOrderRepository,
            query
        );

        for (const workOrder of workOrders?.items) {
            await this.setClient(workOrder);
        }

        return workOrders;
    }

}
