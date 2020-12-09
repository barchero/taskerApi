import {GetShortWorkOrdersList} from '@domain/workOrders/use-cases/getShortWorkOrdersList';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';
import {QueryList} from '@domain/workOrders/entities/QueryList';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {ShortWorkOrdersRepository} from '@domain/workOrders/repositories/ShortWorkOrdersRepository';

export class GetShortWorkOrdersListImpl implements GetShortWorkOrdersList {
    constructor(
        private shortWorkOrdersRepository: ShortWorkOrdersRepository
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

    async execute(queryList: QueryList<ShortWorkOrder>): Promise<Pagination<ShortWorkOrder>> {
        const {items, meta}: Pagination<ShortWorkOrder> = await this.shortWorkOrdersRepository.listShortWorkOrders(queryList);
        const shortWorkOrders: ShortWorkOrder[] = this.trimValues(items);
        return Promise.resolve(Object.assign(new Pagination(), {meta, items: shortWorkOrders}));
    }

}
