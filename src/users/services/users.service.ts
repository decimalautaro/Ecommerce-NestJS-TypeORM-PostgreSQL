import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';

import { ProductsService } from '../../products/services/products.service';
import { CustomersService } from './customers.service';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private customersService: CustomersService,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);

    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }

    return this.userRepository.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.findOne(id, {
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      user.customer = customer;
    }
    this.userRepository.merge(user, data);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.delete(id);
  }
}
