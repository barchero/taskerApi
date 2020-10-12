import {Module} from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Config} from '../../Config';
import {ConnectionsEnum} from './enums/ConnectionsEnum';
import {WorkOrderImpl} from './entities/WorkOrder';
import {WorkerImpl} from './entities/Worker';
import {ClientPhoneImpl} from '@infrastructure/mssql/entities/ClientPhone';
import {ClientImpl} from '@infrastructure/mssql/entities/Client';

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
            name: ConnectionsEnum.DATABASE_SERVE0PM,
            database: Config.MSSQL_DATABASE_SERVE0PM,
            entities: [WorkOrderImpl],
            synchronize: true,
        }),

        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_GROUP0001,
            database: Config.MSSQL_DATABASE_GRUP0001,
            entities: [WorkerImpl],
            synchronize: true,
        }),

        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_YEARPM,
            database: Config.MSSQL_DATABASE_YEARPM,
            entities: [ClientImpl, ClientPhoneImpl],
            synchronize: true,
        }),
    ],
})
export class MssqlModule {
}
