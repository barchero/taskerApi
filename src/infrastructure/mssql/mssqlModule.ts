import {Module} from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Config} from '../../Config';
import {ConnectionsEnum} from './enums/ConnectionsEnum';
import {ClientPhoneImpl} from '@infrastructure/mssql/entities/ClientPhone';
import {ClientImpl} from '@infrastructure/mssql/entities/Client';
import {WorkOrderImpl} from '@infrastructure/mssql/entities/WorkOrder';
import {WorkerImpl} from '@infrastructure/mssql/entities/Worker';
import {ShortWorkOrderImpl} from '@infrastructure/mssql/entities/ShortWorkOrder';
import {ShortClientImpl} from '@infrastructure/mssql/entities/ShortClient';

const commonParams: TypeOrmModuleOptions = {
    type: 'mssql',
    host: Config.MSSQL_URL,
    port: Number(Config.MSSQL_PORT),
    username: Config.MSSQL_USER,
    password: Config.MSSQL_PASS
};

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_YEARPM,
            database: Config.MSSQL_DATABASE_YEARPM,
            entities: [ClientImpl, ShortClientImpl, ClientPhoneImpl],
            synchronize: false,
        }),

        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_GROUP0001,
            database: Config.MSSQL_DATABASE_GRUP0001,
            entities: [WorkerImpl],
            synchronize: false,
        }),

        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_SERVE0PM,
            database: Config.MSSQL_DATABASE_SERVE0PM,
            entities: [WorkOrderImpl, ShortWorkOrderImpl, ClientImpl, ShortClientImpl, ClientPhoneImpl, WorkerImpl],
            synchronize: false,
        })
    ],
})
export class MssqlModule {
}
