import {Client} from '@domain/workOrders/entities/Client';
import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {ClientPhone} from '@domain/workOrders/entities/ClientPhone';
import {ClientPhoneImpl} from '@infrastructure/mssql/entities/ClientPhone';
import {Config} from '../../../Config';

@Entity({
    name: 'clientes',
    database: Config.MSSQL_DATABASE_YEARPM
})
export class ClientImpl extends Client{

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

    @Column({
        name: 'direccion',
        type: 'char',
        length: 80
    })
    street: string;

    @Column({
        name: 'poblacion',
        type: 'char',
        length: 30
    })
    town: string;

    @Column({
        name: 'provincia',
        type: 'char',
        length: 30
    })
    state: string;

    @Column({
        name: 'codpost',
        type: 'char',
        length: 10
    })
    postalCode: string;

    @Column({
        name: 'email',
        type: 'char',
        length: 60
    })
    email: string;

    @OneToMany(type => ClientPhoneImpl, phone => phone.id)
    phones: ClientPhone[];
}
