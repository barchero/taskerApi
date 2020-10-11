import {Column, Entity, PrimaryColumn} from 'typeorm';
import {Config} from '../../../Config';
import {WorkOrder} from '@domain/workOrders/entities/WorkOrder';

@Entity({
    name: 'ordres',
    database: Config.MSSQL_DATABASE_SERVE0PM
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

    @Column({
        name: 'cliente',
        type: 'char',
        length: 8
    })
    clientNumber: string;

    @Column({
        name: 'nomclient',
        type: 'char',
        length: 80
    })
    clientName: string;

    @Column({
        name: 'previs_ent',
        type: 'smalldatetime'
    })
    deliveryDate: Date;

    @Column({
        name: 'centra',
        type: 'char',
        length: 2
    })
    startWorker: string;

    @Column({
        name: 'csurt',
        type: 'char',
        length: 2
    })
    endWorker: string;

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
