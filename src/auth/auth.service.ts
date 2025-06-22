// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// No JwtService aquí
import * as bcrypt from 'bcrypt'; // Asegúrate de que estés usando 'bcrypt' o 'bcryptjs' consistentemente

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // No inyectamos JwtService
  ) {}

  async validateUser(correo_electronico: string, contraseña: string): Promise<any> {
    const user = await this.usersService.findByEmail(correo_electronico).catch(() => null); // Usa .catch para manejar NotFoundException
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (user && isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { contraseña, ...result } = user; // Excluir la contraseña
      return result; // Devuelve el objeto usuario sin contraseña
    }
    return null;
  }

  // El método login ahora solo devuelve el usuario, no genera token
  async login(user: any) {
    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo_electronico: user.correo_electronico,
        rol: user.rol,
      },
    };
  }

  async register(userData: any) {
    const existingUser = await this.usersService.findByEmail(userData.correo_electronico).catch(() => null);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado.');
    }

    if (!userData.rol) {
      userData.rol = 'cliente';
    } else if (userData.rol === 'admin') {
      throw new BadRequestException('No se permite el registro de administradores directamente.');
    }

    const user = await this.usersService.create(userData); // UsersService se encarga del hasheo
    return this.login(user); // Llama a login para devolver el formato de respuesta del usuario
  }
}