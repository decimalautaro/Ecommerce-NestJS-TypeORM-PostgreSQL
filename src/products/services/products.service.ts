import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);

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
    this.productRepository.merge(product, data);
    return this.productRepository.save(product);
  }
}
