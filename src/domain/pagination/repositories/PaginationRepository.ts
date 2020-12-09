import {Pagination} from '@domain/pagination/entities/Pagination';
import {QueryList} from '@domain/workOrders/entities/QueryList';

export abstract class PaginationRepository {
    abstract async paginate<T>(repository: unknown, options: QueryList<unknown>): Promise<Pagination<T>>;
}
