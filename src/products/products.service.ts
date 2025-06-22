// src/products/products.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
// Importa la entidad Category
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category) // Inyecta el repositorio de Category directamente
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoria, ...rest } = createProductDto;

    // Buscar la categoría por su nombre
    const foundCategory = await this.categoryRepository.findOne({ where: { nombre: categoria.nombre } });
    if (!foundCategory) {
      throw new BadRequestException(`Category with name "${categoria.nombre}" not found.`);
    }

    const product = this.productRepository.create({
      ...rest,
      categoria: foundCategory, // Asigna la entidad Category encontrada
    });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    // Carga los productos incluyendo la relación con la categoría y selecciona los campos especificados
    return this.productRepository.find({
      relations: ['categoria'],
      select: {
        id: true,
        nombre: true,
        precio: true,
        marca: true,
        color: true,
        tallas: true,
        stock: true,
        descripcion: true,
        especificaciones: true,
        etiquetas: true,
        imagen_nombre_archivo: true, // Asegúrate de incluir el nuevo campo
        categoria: {
          id: true, // Incluye el ID si el frontend lo necesita, o false si solo el nombre
          nombre: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria'], // Asegúrate de cargar la relación
      select: {
        id: true,
        nombre: true,
        precio: true,
        marca: true,
        color: true,
        tallas: true,
        stock: true,
        descripcion: true,
        especificaciones: true,
        etiquetas: true,
        imagen_nombre_archivo: true, // Asegúrate de incluir el nuevo campo
        categoria: {
          id: true,
          nombre: true,
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id); // Reutiliza findOne para validar existencia y cargar categoría

    // Si se proporciona un nuevo nombre de categoría, búscalo y asignalo
    if (updateProductDto.categoria && updateProductDto.categoria.nombre) {
      const newCategory = await this.categoryRepository.findOne({ where: { nombre: updateProductDto.categoria.nombre } });
      if (!newCategory) {
        throw new BadRequestException(`Category with name "${updateProductDto.categoria.nombre}" not found.`);
      }
      product.categoria = newCategory;
      // Elimina la propiedad 'categoria' del DTO para evitar que Object.assign intente sobreescribirla incorrectamente
      delete updateProductDto.categoria;
    }

    // Asigna las propiedades restantes
    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stock = quantity;
    return this.productRepository.save(product);
  }
}