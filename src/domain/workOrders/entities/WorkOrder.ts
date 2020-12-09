import {Client} from '@domain/workOrders/entities/Client';
import {Worker} from '@domain/workOrders/entities/Worker';

export class WorkOrder {
    id: string;
    done: boolean;
    client: Client;
    deliveryDate: Date;
    startWorker: Worker;
    endWorker: Worker;
    startDate: Date;
    endDate: Date;
    serial: string;
    description: string;
    support: number;
    urgent: boolean;
    problem: string;
    solution: string;
}
