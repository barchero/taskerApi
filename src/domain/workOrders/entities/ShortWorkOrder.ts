import {ShortClient} from '@domain/workOrders/entities/ShortClient';

export class ShortWorkOrder {
    id: string;
    done: boolean;
    client: ShortClient;
    deliveryDate: Date;
}
