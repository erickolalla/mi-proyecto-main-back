// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), // Ambas entidades registradas aquí
    MulterModule.register(multerConfig),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}