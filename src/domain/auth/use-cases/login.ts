import {LogInUser} from '../entities/LogInUser';
import {AuthUser} from '../entities/AuthUser';

export abstract class Login {
    abstract async execute(loginData: LogInUser): Promise<AuthUser>;
}
