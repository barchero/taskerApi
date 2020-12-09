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
        const workOrdersQB = this.shortWorkOrderRepository
            .createQueryBuilder(queryBuilderAlias)
            .leftJoinAndSelect(`${queryBuilderAlias}.client`, `${queryBuilderAlias}.client`)

        if(query.where){
            workOrdersQB.where(query.where);
        }

        if(query.orderBy){
            workOrdersQB.orderBy(this.addAliasToOrderKeys('shortWorkOrder', query.orderBy));
        }

        return await this.paginationRepository.paginate<ShortWorkOrder>(
            workOrdersQB,
            query
        );
    }

}
