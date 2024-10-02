import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email, false);

    if (user) {
      const lastPassword = user.passwords.find(
        (password) => password.status === 'ACTIVE',
      );

      const isMatch = await bcrypt.compare(password, lastPassword.password);
      if (isMatch) {
        const { ...rta } = user;

        return rta;
      }
    }

    return null;
  }

  async generateJwt(user: { role: number, id: string }) {
    const payload: PayloadToken = {
      role: (user.role as any).id,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
