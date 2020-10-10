import {GetWorkOrders} from '../../../domain/workOrders/use-cases/getWorkOrders';
import {WorkOrdersRepository} from '../../../domain/workOrders/repositories/WorkOrdersRepository';
import {ShortWorkOrder} from '../../../domain/workOrders/entities/ShortWorkOrder';
import {WorkOrder} from '../../../domain/workOrders/entities/WorkOrder';

export class GetWorkOrdersImpl implements GetWorkOrders{

    constructor(
        private workOrdersRepository: WorkOrdersRepository
    ) {}

    private mapWorkOrderToShortWorkOrder({id, done, clientName, deliveryDate}: WorkOrder){
        return Object.assign(new ShortWorkOrder(), {id, done, clientName, deliveryDate})
    }

    async execute(): Promise<ShortWorkOrder[]> {
        const workOrders = await this.workOrdersRepository.listWorkOrders();
        return workOrders.map(workOrder => this.mapWorkOrderToShortWorkOrder(workOrder));
    }

}
