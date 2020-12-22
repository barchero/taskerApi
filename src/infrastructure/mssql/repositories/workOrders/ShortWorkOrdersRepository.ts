import {Repository} from 'typeorm';
import {PaginationRepository} from '@domain/pagination/repositories/PaginationRepository';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {QueryList} from '@domain/workOrders/entities/QueryList';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';
import {ShortWorkOrdersRepository} from '@domain/workOrders/repositories/ShortWorkOrdersRepository';

export class ShortWorkOrdersRepositoryImpl implements ShortWorkOrdersRepository {
    constructor(
        private shortWorkOrderRepository: Repository<ShortWorkOrder>,
        private paginationRepository: PaginationRepository) {
    }

    private addAliasToOrderKeys(alias: string, orderByCollection: {[key: string]: string}){
        const newOrderBy = {};
        for(const key in orderByCollection){
            if(orderByCollection.hasOwnProperty(key)){
                newOrderBy[`${alias}.${key}`] = orderByCollection[key];
            }
        }
        return newOrderBy;
    }

    async listShortWorkOrders(query: QueryList<ShortWorkOrder>): Promise<Pagination<ShortWorkOrder>> {
        const queryBuilderAlias = 'shortWorkOrder'
/*        const workOrdersQB = this.shortWorkOrderRepository
            .createQueryBuilder(queryBuilderAlias)
            .leftJoinAndSelect(`${queryBuilderAlias}.client`, `${queryBuilderAlias}.client`)*/

       /* if(query.where){
            if(typeof query.where === 'string'){
                workOrdersQB.where(queryBuilderAlias + '.' + query.where);
            } else if(typeof query.where === 'object'){
                workOrdersQB.where(query.where);
            }
        }

        if(query.orderBy){
            workOrdersQB.orderBy(this.addAliasToOrderKeys('shortWorkOrder', query.orderBy));
        }

        if(query.pagination.limit){
            workOrdersQB.limit(query.pagination.limit);
        }

        if(query.pagination.page) {
            workOrdersQB.offset(query.pagination.limit*(query.pagination.page-1))
        }

/!*        return await this.paginationRepository.paginate<ShortWorkOrder>(
            workOrdersQB,
            query
        );*!/
        const [data, total] = await workOrdersQB.getManyAndCount();*/

        const [data, total] = await this.shortWorkOrderRepository.findAndCount({
            relations: ["client"],
            where: query.where,
            order: query.orderBy,
            take: query.pagination.limit,
            skip: (query.pagination.limit*(query.pagination.page-1))
        });


        const res = new Pagination<ShortWorkOrder>();
        res.items = data;
        res.meta = {
            currentPage: query.pagination.page,
            itemCount: data.length,
            itemsPerPage: query.pagination.limit,
            totalItems: total,
            totalPages: Math.ceil(total/query.pagination.limit)
        }

        return res;
    }

}
