// src/products/dto/create-product.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsArray,
  ArrayMinSize,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para la categoría anidada
class CategoryDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CategoryDto)
  categoria: CategoryDto; // Espera un objeto con el nombre de la categoría

  @IsNotEmpty()
  @IsString()
  marca: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tallas: string[];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  especificaciones?: string;

  @IsOptional()
  @IsString()
  etiquetas?: string;

  @IsOptional()
  @IsString() // Se espera el nombre del archivo, ej: "H_1.png"
  imagen_nombre_archivo?: string;
}