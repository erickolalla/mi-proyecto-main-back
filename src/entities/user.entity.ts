import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ length: 20, unique: true })
  cedula: string;

  @Column({ length: 100, unique: true })
  correo_electronico: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ length: 255 })
  contraseña: string;
}