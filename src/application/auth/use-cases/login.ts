import {Login} from '../../../domain/auth/use-cases/login';
import {LoginRepository} from '../../../domain/auth/repositories/LoginRepository';
import {LogInUser} from '../../../domain/auth/entities/LogInUser';
import {AuthUser} from '../../../domain/auth/entities/AuthUser';

export class LoginImpl extends Login {

    constructor(private loginRepository: LoginRepository){
        super();
    }

    async execute(loginData: LogInUser): Promise<AuthUser> {
        return this.loginRepository.findUserByUsername(loginData.username)
    }

}
