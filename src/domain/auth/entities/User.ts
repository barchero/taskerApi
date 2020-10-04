import {RolesEnum} from '../enums/RolesEnum';

export class User {
    _id: string;
    codigo: number = 0;
    firstName: string = '';
    lastName: string = '';
    displayName: string = '';
    email: string = '';
    username: string = '';
    password: string = '';
    onlinePass: string = '';
    salt: string;
    roles: RolesEnum[] = [];
    updated: Date;
    created = Date.now();
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    notifications: object[];
    /*
    codigo: string = ';
    lastName: string = '';
    displayName?: string;
    email: string = '';
    roles: RolesEnum[] = [RolesEnum.USER];
    updated: Date;
    created: Date = new Date(Date.now());*/
}
