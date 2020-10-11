import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';

export abstract class GetWorkOrderById {
    abstract async execute(id: string): Promise<WorkOrder>;
}
