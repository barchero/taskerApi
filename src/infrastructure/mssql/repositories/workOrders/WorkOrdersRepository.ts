import {WorkOrdersRepository} from '../../../../domain/workOrders/repositories/WorkOrdersRepository';
import {WorkOrder} from '../../../../domain/workOrders/entities/WorkOrder';
import {EntityManager} from 'typeorm';
import {WorkOrder as WorkOrderEntity} from  '../../entities/WorkOrder';
import {Worker as WorkerEntity} from '../../entities/Worker';

export class WorkOrdersRepositoryImpl implements WorkOrdersRepository{
    constructor(private workOrderEntityManager: EntityManager, private workerEntityManager: EntityManager){}

    private async getWorkersById(id: string): Promise<WorkerEntity>{
        return this.workerEntityManager.findOne(WorkerEntity, {where: {id}})
    }

    async getWorkOrderById(id: string): Promise<WorkOrder> {
        return this.workOrderEntityManager.findOne<WorkOrder>(WorkOrderEntity, {where: {id}});
    }

    async listOpenWorkOrders(): Promise<WorkOrder[]> {
        return this.workOrderEntityManager.find<WorkOrder>(WorkOrderEntity, {where:{done: true}});
    }

    async listWorkOrders(): Promise<WorkOrder[]> {
        return this.workOrderEntityManager.find(WorkOrderEntity, {take: 100})
            .then(async response => {
                const newResponse: WorkOrder[] = [];
/*                return response.map(async (workOrder) => {
                    const startWorker = await this.getWorkersById(workOrder.startWorker);
                    const endWorker = await this.getWorkersById(workOrder.endWorker);

                    return Object.assign(new WorkOrder(), {...workOrder, startWorker, endWorker}) as WorkOrder;
                })*/

                for(let workOrder of response){
                    const startWorker = await this.getWorkersById(workOrder.startWorker) || workOrder.startWorker;
                    const endWorker = await this.getWorkersById(workOrder.endWorker) || workOrder.endWorker;

                    newResponse.push(Object.assign(new WorkOrder(), {...workOrder, startWorker, endWorker}));
                }

                return newResponse;
            });

    }

}
