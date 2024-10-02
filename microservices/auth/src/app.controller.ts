import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './api/auth/services/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(data: { payload: { email: string; password: string } }) {
    const email = data.payload.email;
    const password = data.payload.password;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return {
        error: HttpStatus.UNAUTHORIZED,
        message: 'Access denied',
      };
    }
  
    const result = this.authService.generateJwt(user);

    delete user.passwords;

    return {
      access_token: (await result).access_token,
      user,
    };
  }
}
