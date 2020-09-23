import { Module } from '@nestjs/common';
import {AuthController} from '../controllers/auth.controller';
import {AuthService} from '../services/auth.service';
import {userSchemaModule} from '../../../infrastructure/mongodb/schemas/User';
import {notificationsSchemaModule} from '../../../infrastructure/mongodb/schemas/Notifications';

@Module({
    imports: [
        userSchemaModule,
        notificationsSchemaModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
