// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const { contraseña, ...rest } = userData;
    if (!contraseña) {
      throw new Error('La contraseña es requerida para crear un usuario.');
    }
    const hashedPassword = await bcrypt.hash(contraseña, 10); // Hash de contraseña
    const user = this.userRepository.create({ ...rest, contraseña: hashedPassword });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { correo_electronico: email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id); // Usa findOne para verificar existencia y obtener el usuario
    if (userData.contraseña) {
      userData.contraseña = await bcrypt.hash(userData.contraseña, 10);
    }
    // Asigna solo las propiedades que existen en userData
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  // --- NUEVO MÉTODO PARA ELIMINAR USUARIO ---
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}