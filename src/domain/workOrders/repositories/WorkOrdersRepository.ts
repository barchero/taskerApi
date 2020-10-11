import {WorkOrder} from '../entities/WorkOrder';

export abstract class WorkOrdersRepository {
    abstract async listWorkOrders(): Promise<WorkOrder[]>;

    abstract async listOpenWorkOrders(): Promise<WorkOrder[]>;

    abstract async getWorkOrderById(id: string): Promise<WorkOrder>;
}
