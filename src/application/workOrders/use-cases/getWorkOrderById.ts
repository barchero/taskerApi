import {GetWorkOrderById} from '@domain/workOrders/use-cases/getWorkOrderById';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {Worker} from '@domain/workOrders/entities/Worker';

export class GetWorkOrderByIdImpl implements GetWorkOrderById{

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

    async execute(id: string): Promise<WorkOrder> {
        const workOrder = await this.workOrdersRepository.getWorkOrderById(id);

        return this.trimValues(workOrder);
    }
}
