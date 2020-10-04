import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserModel} from '../../../infrastructure/mongodb/schemas/UserModel';
import {AuthUser} from '../../../domain/auth/entities/AuthUser';
import {LogInUser} from '../../../domain/auth/entities/LogInUser';
import {LoginImpl} from '../../../application/auth/use-cases/login';
import {LoginRepositoryImpl} from '../../../infrastructure/mongodb/repositories/auth/LoginRepository';
import {Model} from 'mongoose';
import {LoginRepository} from '../../../domain/auth/repositories/LoginRepository';
import {JwtService} from '@nestjs/jwt';
import {GetLoggedUserImpl} from '../../../application/auth/use-cases/getLoggedUser';

@Injectable()
export class AuthService {
    private readonly loginRepository: LoginRepository;

    constructor(
        @InjectModel('User') private userModel: Model<UserModel>,
        private jwtService: JwtService
        ){
        this.loginRepository = new LoginRepositoryImpl(this.userModel);
    }

    async validateUser(username: string, password: string): Promise<AuthUser> {
        const userData = Object.assign(new LogInUser(), {username, password});
        const loginImpl = new LoginImpl(this.loginRepository);
        return loginImpl.execute(userData);
    }

    async getJWT(user: AuthUser){
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async getLoggedUser(loggedUserId){
        const getLoggedUserImpl = new GetLoggedUserImpl(this.loginRepository);
        return getLoggedUserImpl.execute(loggedUserId);
    }
}
