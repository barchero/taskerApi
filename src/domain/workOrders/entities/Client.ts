import {ClientPhone} from '@domain/workOrders/entities/ClientPhone';

export class Client {
    id: string;
    name: string;
    street: string;
    town: string;
    state: string;
    postalCode: string;
    email: string;
    phones: ClientPhone[];
}
