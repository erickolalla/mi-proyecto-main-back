import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsNumber, Min, IsString, IsArray, ArrayMinSize, IsInt } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number;

  @IsOptional()
  @IsInt()
  categoria_id?: number;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tallas?: string[];

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
  @IsString()
  imagen_nombre_archivo?: string;
}