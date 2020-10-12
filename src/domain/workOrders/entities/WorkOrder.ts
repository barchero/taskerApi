import {Client} from '@domain/workOrders/entities/Client';
import {Worker} from '@domain/workOrders/entities/Worker';

export class WorkOrder {
    id: string;
    done: boolean;
    clientCode: string;
    client: Client;
    deliveryDate: Date;
    startWorkerCode: string;
    startWorker: Worker;
    endWorkerCode: string;
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
