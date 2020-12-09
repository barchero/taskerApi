import {WorkOrder} from '../entities/WorkOrder';

export abstract class WorkOrdersRepository {
    abstract async getWorkOrderById(id: string): Promise<WorkOrder>;
}
