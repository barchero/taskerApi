import {InjectEntityManager} from '@nestjs/typeorm';
import {ConnectionsEnum} from '@infrastructure/mssql/enums/ConnectionsEnum';
import {WorkOrderImpl} from '@infrastructure/mssql/entities/WorkOrder';
import {Injectable} from '@nestjs/common';
import {EntityManager} from 'typeorm';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';
import {WorkOrdersRepositoryImpl} from '@infrastructure/mssql/repositories/workOrders/WorkOrdersRepository';
import {GetShortWorkOrdersListImpl} from '@application/workOrders/use-cases/getWorkOrdersList';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {GetWorkOrderByIdImpl} from '@application/workOrders/use-cases/getWorkOrderById';
import {WorkOrdersRepository} from '@domain/workOrders/repositories/WorkOrdersRepository';
import {QueryList} from '@domain/workOrders/entities/QueryList';
import {PaginationRepositoryImpl} from '@infrastructure/mssql/repositories/pagination/PaginationRepository';
import {Pagination} from '@domain/pagination/entities/Pagination';
import {ShortWorkOrderImpl} from '@infrastructure/mssql/entities/ShortWorkOrder';
import {ShortWorkOrdersRepositoryImpl} from '@infrastructure/mssql/repositories/workOrders/ShortWorkOrdersRepository';
import {ShortWorkOrdersRepository} from '@domain/workOrders/repositories/ShortWorkOrdersRepository';


@Injectable()
export class WorkOrdersService {

    private readonly workOrdersRepository: WorkOrdersRepository;
    private readonly shortWorkOrdersRepository: ShortWorkOrdersRepository;

    constructor(
        @InjectEntityManager(ConnectionsEnum.DATABASE_SERVE0PM)
        private databaseServe0pmEntityManager: EntityManager
    ) {
        this.workOrdersRepository = new WorkOrdersRepositoryImpl(
            databaseServe0pmEntityManager.getRepository(WorkOrderImpl),
            new PaginationRepositoryImpl()
        );

        this.shortWorkOrdersRepository = new ShortWorkOrdersRepositoryImpl(
            databaseServe0pmEntityManager.getRepository(ShortWorkOrderImpl),
            new PaginationRepositoryImpl()
        );
    }

    async listShortWorkOrders(req: QueryList<ShortWorkOrder>): Promise<Pagination<ShortWorkOrder>> {
        return new GetShortWorkOrdersListImpl(this.shortWorkOrdersRepository).execute(req);
    }

    async getWorkOrderById(id: string): Promise<WorkOrder> {
        return new GetWorkOrderByIdImpl(this.workOrdersRepository).execute(id);
    }
}
