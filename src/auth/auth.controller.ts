// src/auth/auth.controller.ts
import { Controller, Post, Request, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
 // <-- Asegúrate de que la ruta sea correcta
    // <-- ¡Importa tu nuevo DTO aquí!

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) { // <-- Usa LoginUserDto en @Body
    // La validación del DTO ocurre automáticamente gracias a los ValidationPipes de NestJS
    // req.user ya contiene el usuario validado por LocalStrategy
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) { // <-- Usa CreateUserDto en @Body
    return this.authService.register(createUserDto);
  }
}