import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthGuard} from '@nestjs/passport';
import {AuthUser} from '@domain/auth/entities/AuthUser';
import {RolesEnum} from '@domain/auth/enums/RolesEnum';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {

    constructor(private roles: RolesEnum[], private conditionMode: 'AND' | 'OR' = 'OR'){
        super();
    }

    private userHasPermission(user: Partial<AuthUser>): boolean {
        if(this.conditionMode === 'AND'){
            for(const role of this.roles){
                if(user.roles.indexOf(role) === -1){
                    return false;
                }
            }
        } else if(this.conditionMode === 'OR') {
            const foundRoles = [];
            for(const role of this.roles){
                if(user.roles.indexOf(role) !== -1){
                    foundRoles.push(role);
                }
            }

            if(foundRoles.length === 0){
                return false;
            }
        }
        return true;
    }

    handleRequest(err, user, info){
        if(err || !user || !this.userHasPermission(user)){
            throw err || new UnauthorizedException();
        }

        return user;
    }

}
