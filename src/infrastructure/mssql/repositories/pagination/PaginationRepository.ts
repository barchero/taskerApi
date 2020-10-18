import {PaginationRepository} from '@domain/pagination/repositories/PaginationRepository';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {IPaginationOptions, paginate as _paginate} from 'nestjs-typeorm-paginate';
import {Repository} from 'typeorm';
import {QueryList} from '@domain/workOrders/entities/QueryList';

export class PaginationRepositoryImpl implements PaginationRepository{
    async paginate<T>(repository: Repository<T>, {pagination, orderBy, where}: QueryList): Promise<Pagination<T>> {
        pagination = Object.assign(new Pagination(), pagination);
        return _paginate<T>(repository, pagination as IPaginationOptions, {where, order: orderBy});
    }
}
