// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombres: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  apellidos: string;

  @IsString()
  @IsNotEmpty({message: 'La cédula es obligatoria.'})
  cedula: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  correo_electronico: string;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  fecha_nacimiento: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  contraseña: string;

  // El rol puede ser opcional para el registro público, si lo asignas por defecto en el servicio.
  // Si un administrador puede especificar el rol, y es un valor predefinido, puedes usar @IsIn(['admin', 'cliente'])
  @IsOptional()
  @IsString({ message: 'El rol debe ser una cadena de texto.' })
  rol: string;
}