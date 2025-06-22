// src/entities/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../entities/product.entity'; // Asegúrate de que la ruta sea correcta

@Entity('categoria') // Nombre de la tabla para categorías
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string; // Ej: 'hombres', 'mujeres', 'niñas', 'niños'

  @OneToMany(() => Product, (product: Product) => product.categoria)
  products: Product[];
}