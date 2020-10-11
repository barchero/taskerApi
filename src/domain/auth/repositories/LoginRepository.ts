import {LogInUser} from '../entities/LogInUser';
import {User} from '../entities/User';

export abstract class LoginRepository {
    abstract async findUserByLogInUser(loginData: LogInUser): Promise<User>

    abstract async findUserById(id: string): Promise<User>
}
