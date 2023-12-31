import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll() {
    return this.orderRepository.find({
      relations: ['items', 'items.product'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('not found');
    }

    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepository.findOne(data.customerId);
      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  async update(id: number, data: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (data.customerId) {
      const customer = await this.customerRepository.findOne(data.customerId);
      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    return this.orderRepository.delete(id);
  }

  async ordersByCustomer(userId: number) {
    const customerId = (
      await this.userRepository.findOne(userId, { relations: ['customer'] })
    ).customer.id;
    return this.orderRepository.find({
      where: {
        customer: customerId,
      },
      relations: ['items', 'items.product'],
    });
  }
}
