import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('producto')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoria_id' }) // Especifica el nombre de la columna foránea
  categoria: Category;

  @Column({ length: 50 })
  marca: string;

  @Column({ length: 20 })
  color: string;

  @Column('simple-array')
  tallas: string[];

  @Column()
  stock: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  especificaciones: string;

  @Column({ type: 'text', nullable: true })
  etiquetas: string;

  @Column({ type: 'text', nullable: true })
  imagen_nombre_archivo: string;
}