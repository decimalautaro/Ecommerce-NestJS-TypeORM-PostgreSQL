import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandsService } from './brands.service';

import { Product } from '../entities/product.entity';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandsService: BrandsService,
  ) {}
  async findAll() {
    return await this.productRepository.find({
      relations: ['brand'],
    });
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
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
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
      const brand = await this.brandsService.findOne(data.brandId);
      product.brand = brand;
    }
    this.productRepository.merge(product, data);
    return this.productRepository.save(product);
  }
}
