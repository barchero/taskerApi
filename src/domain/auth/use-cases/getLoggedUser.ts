import {AuthUser} from '../entities/AuthUser';

export abstract class GetLoggedUser {
    abstract async execute(loggedUserId: string): Promise<AuthUser>;
}
