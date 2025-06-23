// src/users/users.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // Habilita validación de DTOs
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    // Convert fecha_nacimiento from string to Date if present
    const userData = {
      ...createUserDto,
      fecha_nacimiento: createUserDto.fecha_nacimiento
        ? new Date(createUserDto.fecha_nacimiento)
        : undefined,
    };
    return this.usersService.create(userData);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Convert fecha_nacimiento from string to Date if present
    const userData = {
      ...updateUserDto,
      fecha_nacimiento: updateUserDto.fecha_nacimiento
        ? new Date(updateUserDto.fecha_nacimiento)
        : undefined,
    };
    return this.usersService.update(+id, userData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content para eliminación exitosa
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }
}