import {PaginationRepository} from '@domain/pagination/repositories/PaginationRepository';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {IPaginationOptions, paginate as _paginate} from 'nestjs-typeorm-paginate';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {QueryList} from '@domain/workOrders/entities/QueryList';

export class PaginationRepositoryImpl implements PaginationRepository{
    async paginate<T>(repository: Repository<T> | SelectQueryBuilder<T>, query: QueryList<unknown>): Promise<Pagination<T>> {
        let {pagination, orderBy: order, where} = Object.assign(new QueryList(), query);
        pagination = Object.assign(new Pagination(), pagination);
        if(repository instanceof Repository) {
            return _paginate<T>(repository, pagination as IPaginationOptions, {where, order} as {});
        } else if(repository instanceof SelectQueryBuilder){
            return _paginate<T>(repository, pagination as IPaginationOptions);
        }
    }
}
