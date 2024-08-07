// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user || (await bcrypt.compare(pass, user.password))) {
      return { id: user.id, username: user.username };
    } else {
      throw new UnauthorizedException();
    }
  }
  async login(signInDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(
      signInDto.username,
      signInDto.password,
    );

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
