import {WorkOrder} from '../entities/WorkOrder';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {QueryList} from '@domain/workOrders/entities/QueryList';

export abstract class WorkOrdersRepository {
    abstract async listWorkOrders(options: QueryList): Promise<Pagination<WorkOrder>>;

    abstract async getWorkOrderById(id: string): Promise<WorkOrder>;
}
