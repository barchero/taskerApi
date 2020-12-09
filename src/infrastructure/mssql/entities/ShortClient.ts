import {Column, Entity, PrimaryColumn} from 'typeorm';
import {Config} from '../../../Config';
import {ShortClient} from '@domain/workOrders/entities/ShortClient';

@Entity({
    name: 'clientes',
    database: Config.MSSQL_DATABASE_YEARPM
})
export class ShortClientImpl extends ShortClient{

    @PrimaryColumn({
        name: 'codigo',
        type: 'char',
        length: 8
    })
    id: string;

    @Column({
        name: 'nombre',
        type: 'char',
        length: 80
    })
    name: string;
}
