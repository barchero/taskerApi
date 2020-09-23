import {RolesEnum} from '../enums/RolesEnum';

export class AuthUser {
    firstName: string = '';
    lastName: string = '';
    displayName?: string;
    email: string = '';
    roles: RolesEnum[] = [RolesEnum.USER];
    updated: Date;
    created: Date = new Date(Date.now());
}
