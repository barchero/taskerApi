import {GetLoggedUser} from '../../../domain/auth/use-cases/getLoggedUser';
import {LoginRepository} from '../../../domain/auth/repositories/LoginRepository';
import {AuthUser} from '../../../domain/auth/entities/AuthUser';
import {User} from '../../../domain/auth/entities/User';

export class GetLoggedUserImpl implements GetLoggedUser {
    constructor(private loginRepository: LoginRepository){}

    private mapUserToAuthUser({_id, username, firstName, lastName, displayName, email, roles, updated, created}: User): AuthUser {
        return Object.assign(new AuthUser(),{id: _id.toString()}, {username, firstName, lastName, displayName, email, roles, updated, created});
    }

    async execute(loggedUserId: string): Promise<AuthUser> {
        const userData = await this.loginRepository.findUserById(loggedUserId);
        if(userData){
            return this.mapUserToAuthUser(userData);
        }
        return null;
    }

}
