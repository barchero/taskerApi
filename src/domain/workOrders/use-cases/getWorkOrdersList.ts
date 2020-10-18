import {ShortWorkOrder} from '../entities/ShortWorkOrder';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {QueryList} from '@domain/workOrders/entities/QueryList';

export abstract class GetWorkOrdersList {
    abstract async execute(options: QueryList): Promise<Pagination<ShortWorkOrder>>;
}
