import { Module } from '@nestjs/common';
import {AuthController} from '../controllers/auth.controller';
import {AuthService} from '../services/auth.service';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {Config} from '../../../Config';
import {LocalStrategy} from '../strategies/local';
import {JwtStrategy} from '../strategies/jwt';
import {MongooseModule} from '../../../infrastructure/mongodb/mongooseModule';

@Module({
    imports: [
        MongooseModule,
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
