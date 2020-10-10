import {Login} from '../../../domain/auth/use-cases/login';
import {LoginRepository} from '../../../domain/auth/repositories/LoginRepository';
import {LogInUser} from '../../../domain/auth/entities/LogInUser';
import {AuthUser} from '../../../domain/auth/entities/AuthUser';
import {UserModel} from '../../../infrastructure/mongodb/schemas/UserModel';
import {User} from '../../../domain/auth/entities/User';

export class LoginImpl implements Login {

    constructor(
        private loginRepository: LoginRepository
    ) {}

    private mapUserToAuthUser({_id, username, firstName, lastName, displayName, email, roles, updated, created}: User): AuthUser {
        return Object.assign(new AuthUser(),{id: _id.toString()}, {username, firstName, lastName, displayName, email, roles, updated, created});
    }

    async execute(loginData): Promise<AuthUser> {
        const authorizedUser = await this.loginRepository.findUserByLogInUser(loginData);
        if(authorizedUser && authorizedUser.password === loginData.password){
            return this.mapUserToAuthUser(authorizedUser);
        }
        return null;
    }

}
