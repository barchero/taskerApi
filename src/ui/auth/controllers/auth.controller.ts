import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {LocalGuard} from '../guards/local';
import {JwtGuard} from '../guards/jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.getJWT(req.user);
    }

    @UseGuards(JwtGuard)
    @Get('profile')
    async user(@Request() req){
        return this.authService.getLoggedUser(req.user.id);
    }


}
