// src/users/dto/login-user.dto.ts
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  correo_electronico: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  // Aunque no validamos longitud mínima aquí para login, es buena práctica si la tuvieras en el backend.
  // @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  contraseña: string;
}