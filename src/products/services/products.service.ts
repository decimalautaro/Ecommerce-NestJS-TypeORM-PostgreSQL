import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async findAll() {
    return await this.productRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    if (data.brandId) {
      const brand = await this.brandRepository.findOne(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepository.findByIds(
        data.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepository.save(newProduct);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepository.delete(id);
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (data.brandId) {
      const brand = await this.brandRepository.findOne(data.brandId);
      product.brand = brand;
    }
    this.productRepository.merge(product, data);
    return this.productRepository.save(product);
  }
}
