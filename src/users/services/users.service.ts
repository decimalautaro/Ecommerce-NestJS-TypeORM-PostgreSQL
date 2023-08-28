import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { ConfigService } from '@nestjs/config';
import { ProductsService } from '../../products/services/products.service';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);

    return this.userRepository.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.userRepository.merge(user, data);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
