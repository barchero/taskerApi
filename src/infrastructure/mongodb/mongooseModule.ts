import {MongooseModule as _MongooseModule} from '@nestjs/mongoose';
import {Config} from '../../Config';
import {Module} from '@nestjs/common';
import {userSchemaModule} from './schemas/UserModel';
import {notificationsSchemaModule} from './schemas/NotificationsModel';

@Module({
    imports: [
        _MongooseModule.forRoot(`mongodb://${Config.MONGODB_URL}:${Config.MONGODB_PORT}/${Config.MONGODB_DATABASE}`),
        userSchemaModule,
        notificationsSchemaModule
    ],
    exports: [
        userSchemaModule,
        notificationsSchemaModule
    ]
})
export class MongooseModule {
}
