// src/auth/strategies/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'correo_electronico' });
  }

  async validate(correo_electronico: string, contraseña: string): Promise<any> {
    const user = await this.authService.validateUser(correo_electronico, contraseña);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    return user;
  }
}