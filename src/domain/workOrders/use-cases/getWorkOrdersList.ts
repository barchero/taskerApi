import {ShortWorkOrder} from '../entities/ShortWorkOrder';

export abstract class GetWorkOrdersList {
    abstract async execute(): Promise<ShortWorkOrder[]>;
}
