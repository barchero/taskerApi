import {Worker} from '../entities/Worker';

export abstract class WorkerRepository {
    abstract async listWorkers(): Promise<Worker[]>;
}
