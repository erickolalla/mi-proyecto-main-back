// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'; // Todavía necesitamos PassportModule para LocalStrategy
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
// Mantenemos LocalStrategy para la validación de usuario/contraseña

@Module({
  imports: [
    UsersModule, // AuthService necesita UsersService
    PassportModule, // Necesario para la estrategia local
  ],
  providers: [AuthService, LocalStrategy], // Solo AuthService y LocalStrategy
  controllers: [AuthController],
  exports: [AuthService], // Exporta AuthService si otros módulos lo necesitan
})
export class AuthModule {}