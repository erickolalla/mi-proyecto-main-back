import { Controller, Get, Post, Put, Delete, Param, Body, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../multer.config';
import { File as MulterFile } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('category') category?: string): Promise<Product[]> {
    if (category) return this.productsService.findAll().then(products => products.filter(p => p.categoria.nombre === category));
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: MulterFile): Promise<Product> {
    if (file) {
      createProductDto.imagen_nombre_archivo = file.filename;
    }
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  update(@Param('id') id: number, @Body() product: Product, @UploadedFile() file: MulterFile): Promise<Product> {
    if (file) {
      product.imagen_nombre_archivo = file.filename;
    }
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}