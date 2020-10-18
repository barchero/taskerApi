import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import {Config} from '../../../Config';
import {RolesEnum} from '@domain/auth/enums/RolesEnum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.JWT_SECRET
        });
    }

    async validate(payload: { sub: string, username: string, roles: RolesEnum[] }) {
        return {id: payload.sub, username: payload.username, roles: payload.roles};
    }
}
