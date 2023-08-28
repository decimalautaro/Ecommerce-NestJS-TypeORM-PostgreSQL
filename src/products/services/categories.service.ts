import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);

    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoryRepository.merge(category, data);
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not exist`);
    }
    return this.categoryRepository.delete(id);
  }
}
