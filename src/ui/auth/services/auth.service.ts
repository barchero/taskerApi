import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../../../infrastructure/mongodb/schemas/User';
import {AuthUser} from '../../../domain/auth/entities/AuthUser';
import {LogInUser} from '../../../domain/auth/entities/LogInUser';
import {LoginImpl} from '../../../application/auth/use-cases/login';
import {LoginRepositoryImpl} from '../../../infrastructure/mongodb/repositories/auth/LoginRepository';
import {Model} from 'mongoose';
import {LoginRepository} from '../../../domain/auth/repositories/LoginRepository';

@Injectable()
export class AuthService {
    private readonly loginRepository: LoginRepository;

    constructor(@InjectModel('User') private userModel: Model<User>){
        this.loginRepository = new LoginRepositoryImpl(this.userModel);
    }

    async login(userData: LogInUser): Promise<AuthUser> {
        const loginImpl = new LoginImpl(this.loginRepository);
        return loginImpl.execute(userData);
    }
}
