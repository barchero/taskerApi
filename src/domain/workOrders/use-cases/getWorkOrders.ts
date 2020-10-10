import {ShortWorkOrder} from '../entities/ShortWorkOrder';

export abstract class GetWorkOrders {
    abstract async execute(): Promise<ShortWorkOrder[]>;
}
