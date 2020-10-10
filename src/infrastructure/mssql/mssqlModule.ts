import { Module } from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Config} from '../../Config';
import {WorkOrder} from './entities/WorkOrder';
import {Worker} from './entities/Worker';
import {ConnectionsEnum} from './enums/ConnectionsEnum';

const commonParams: TypeOrmModuleOptions = {
    type: 'mssql',
    host: Config.MSSQL_URL,
    port: Number(Config.MSSQL_PORT),
    username: Config.MSSQL_USER,
    password: Config.MSSQL_PASS
}

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_SERVE0PM,
            database: Config.MSSQL_DATABASE_SERVE0PM,
            entities: [WorkOrder],
            synchronize: true,
        }),

        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_GROUP0001,
            database: Config.MSSQL_DATABASE_GRUP0001,
            entities: [Worker],
            synchronize: true,
        }),

        TypeOrmModule.forRoot({
            ...commonParams,
            name: ConnectionsEnum.DATABASE_YEARPM,
            database: Config.MSSQL_DATABASE_YEARPM,
            entities: [],
            synchronize: true,
        }),
    ],
})
export class MssqlModule {}
