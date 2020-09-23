import {AuthUser} from '../entities/AuthUser';

export abstract class LoginRepository {
    abstract async findUserByUsername(username: string): Promise<AuthUser>
}
