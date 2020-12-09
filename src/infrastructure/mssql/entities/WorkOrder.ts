import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';
import {Client} from '@domain/workOrders/entities/Client';
import {Worker} from '@domain/workOrders/entities/Worker';
import {Config} from '../../../Config';
import {ClientImpl} from '@infrastructure/mssql/entities/Client';
import {WorkerImpl} from '@infrastructure/mssql/entities/Worker';

@Entity({
    name: 'ordres',
    database: Config.MSSQL_DATABASE_SERVE0PM,
})
export class WorkOrderImpl extends WorkOrder {
    @PrimaryColumn({
        name: 'codigo',
        type: 'char',
        length: 8
    })
    id: string;

    @Column({
        name: 'rep_aca',
        type: 'bit',
        default: 0
    })
    done: boolean;

    @OneToOne(() => ClientImpl, client => client.id)
    @JoinColumn({
        name: 'cliente'
    })
    client: Client;

    @Column({
        name: 'previs_ent',
        type: 'smalldatetime'
    })
    deliveryDate: Date;

    @OneToOne(() => WorkerImpl, worker => worker.id)
    @JoinColumn({
        name: 'centra'
    })
    startWorker: Worker;

    @OneToOne(() => WorkerImpl, worker => worker.id)
    @JoinColumn({
        name: 'csurt'
    })
    endWorker: Worker;

    @Column({
        name: 'dataentra',
        type: 'smalldatetime'
    })
    startDate: Date;

    @Column({
        name: 'datasurt',
        type: 'smalldatetime'
    })
    endDate: Date;

    @Column({
        name: 'serie',
        type: 'char',
        length: 30
    })
    serial: string;

    @Column({
        name: 'mod_extern',
        type: 'char',
        length: 70
    })
    description: string;

    @Column({
        name: 'mantenimen',
        type: 'numeric',
        precision: 6,
        scale: 20
    })
    support: number;

    @Column({
        type: 'bit',
        default: 0
    })
    urgent: boolean;

    @Column({
        name: 'problema',
        type: 'text'
    })
    problem: string;

    @Column({
        name: 'solucio',
        type: 'text'
    })
    solution: string;

}
