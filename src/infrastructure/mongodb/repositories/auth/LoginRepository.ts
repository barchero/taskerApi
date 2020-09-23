import {LoginRepository} from '../../../../domain/auth/repositories/LoginRepository';
import {AuthUser} from '../../../../domain/auth/entities/AuthUser';
import {Model} from 'mongoose';
import {User} from '../../schemas/User';

export class LoginRepositoryImpl extends LoginRepository {
    
    constructor(private userModel: Model<User>){
        super();
    }
    
    async findUserByUsername(username: string): Promise<AuthUser> {
        return new Promise<AuthUser>((success, error) => {
            this.userModel.findOne({username: username}, (err, res) => {
                if(err){
                    error(err);
                } else {
                    success(this.mapUserToAuthUser(res));
                }
            });
        })
    }

    mapUserToAuthUser({firstName, lastName, displayName, email, roles, updated, created}: User): AuthUser {
        return Object.assign(new AuthUser(), {firstName, lastName, displayName, email, roles, updated, created});
    }

}
