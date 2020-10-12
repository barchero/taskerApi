import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';

export abstract class getOpenWorkOrdersList {
    abstract async execute(): Promise<WorkOrder[]>;
}
