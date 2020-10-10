export class WorkOrder {
    id: string;
    done: boolean;
    clientNumber: string;
    clientName: string;
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
