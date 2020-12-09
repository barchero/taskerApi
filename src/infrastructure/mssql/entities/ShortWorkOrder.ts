import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {Config} from '../../../Config';
import {ShortWorkOrder} from '@domain/workOrders/entities/ShortWorkOrder';
import {ShortClientImpl} from '@infrastructure/mssql/entities/ShortClient';

@Entity({
    name: 'ordres',
    database: Config.MSSQL_DATABASE_SERVE0PM,
})
export class ShortWorkOrderImpl extends ShortWorkOrder {
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

    @OneToOne(() => ShortClientImpl, client => client.id)
    @JoinColumn({
        name: 'cliente',
    })
    client: ShortClientImpl;

    @Column({
        name: 'previs_ent',
        type: 'smalldatetime'
    })
    deliveryDate: Date;

}
