import {Repository} from 'typeorm';
import {WorkerRepository} from '@domain/workOrders/repositories/WorkerRepository';
import {Worker} from '@domain/workOrders/entities/Worker';

export class WorkerRepositoryImpl implements WorkerRepository {

    constructor(
        private workerRepository: Repository<Worker>
    ) {
    }

    async listWorkers(): Promise<Worker[]> {
        return this.workerRepository.find();
    }
}
