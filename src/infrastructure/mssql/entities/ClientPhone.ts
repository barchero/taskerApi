import {ClientPhone} from '@domain/workOrders/entities/ClientPhone';
import {Column, Entity, PrimaryColumn} from 'typeorm';
import {Config} from '../../../Config';

@Entity({
    name: 'telf_cli',
    database: Config.MSSQL_DATABASE_YEARPM
})
export class ClientPhoneImpl extends ClientPhone{
    @PrimaryColumn({
        name: 'cliente',
        type: 'char',
        length: 8
    })
    id: string;

    @Column({
        name: 'texto',
        type: 'char',
        length: 20
    })
    name: string;

    @Column({
        name: 'telefono',
        type: 'char',
        length: 15
    })
    phone: string;
}
