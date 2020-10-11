import {Column, Entity, PrimaryColumn} from 'typeorm';
import {Config} from '../../../Config';
import {Worker} from '@domain/workOrders/entities/Worker';

@Entity({
    name: 'tecnicos',
    database: Config.MSSQL_DATABASE_GRUP0001
})
export class WorkerImpl extends Worker {
    @PrimaryColumn({
        name: 'CODIGO',
        type: 'char',
        length: '2'
    })
    id: string;

    @Column({
        name: 'NOMBRE',
        type: 'char',
        length: '30'
    })
    name: string;

}
