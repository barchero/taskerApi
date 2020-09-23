import {Body, Controller, Post} from '@nestjs/common';
import {AuthUser} from '../../../domain/auth/entities/AuthUser';
import {AuthService} from '../services/auth.service';
import {LogInUser} from '../../../domain/auth/entities/LogInUser';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() userData: LogInUser): Promise<AuthUser> {
        return this.authService.login(userData);
    }
}
