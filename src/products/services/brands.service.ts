import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = this.brandRepository.create(data);

    return this.brandRepository.save(newBrand);
  }

  async update(id: number, data: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne({ id });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brandRepository.merge(brand, data);
    return this.brandRepository.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepository.findOne({ id });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return this.brandRepository.delete(id);
  }
}
