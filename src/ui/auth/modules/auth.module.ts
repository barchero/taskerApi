import { Module } from '@nestjs/common';
import {AuthController} from '../controllers/auth.controller';
import {AuthService} from '../services/auth.service';
import {userSchemaModule} from '../../../infrastructure/mongodb/schemas/UserModel';
import {notificationsSchemaModule} from '../../../infrastructure/mongodb/schemas/NotificationsModel';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {Config} from '../../../Config';
import {LocalStrategy} from '../strategies/local';
import {JwtStrategy} from '../strategies/jwt';

@Module({
    imports: [
        userSchemaModule,
        notificationsSchemaModule,
        PassportModule,
        JwtModule.register({
            secret: Config.JWT_SECRET,
            signOptions: { expiresIn: Config.JWT_EXPIRATION }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
