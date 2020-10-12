import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {GetWorkOrdersList} from '@domain/workOrders/use-cases/getWorkOrdersList';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';

export class GetWorkOrdersListImpl implements GetWorkOrdersList {
    constructor(
        private workOrdersRepository: WorkOrdersRepository
    ) { }

    private trimValues(obj) {
        const _obj = Object.assign(obj);
        for (const prop in _obj) {
            const value = _obj[prop];
            const type = typeof value;
            if (value != null && (type == 'string' || type == 'object') && _obj.hasOwnProperty(prop)) {
                if (type == 'object') {
                    this.trimValues(_obj[prop]);
                } else {
                    _obj[prop] = _obj[prop].trim();
                }
            }
        }
        return _obj;
    }

    private mapWorkOrderToShortWorkOrder({id, done, client, deliveryDate}: WorkOrder) {
        const response = Object.assign(new ShortWorkOrder(), {id, done, deliveryDate, clientName: client?.name});
        return this.trimValues(response);
    }

    async execute(): Promise<ShortWorkOrder[]> {
        const workOrders = await this.workOrdersRepository.listWorkOrders();
        return workOrders.map(workOrder => this.mapWorkOrderToShortWorkOrder(workOrder));
    }

}
