import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../dtos/order-item.dto';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return this.orderItemRepository.find({
      relations: ['order', 'product'],
    });
  }

  async findOne(id: number) {
    const item = await this.orderItemRepository.findOne(id, {
      relations: ['order', 'product'],
    });
    if (!item) {
      throw new NotFoundException('not found');
    }

    return item;
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepository.findOne(data.orderId);
    const product = await this.productRepository.findOne(data.productId);

    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.orderItemRepository.save(item);
  }

  async update(id: number, data: UpdateOrderItemDto) {
    const item = await this.orderItemRepository.findOne({ where: { id } });
    if (data.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: data.orderId },
      });
      item.order = order;
    }
    if (data.productId) {
      const product = await this.productRepository.findOne({
        where: { id: data.productId },
      });
      item.product = product;
    }
    this.orderItemRepository.merge(item, data);
    return this.orderItemRepository.save(item);
  }

  remove(id: number) {
    return this.orderItemRepository.delete(id);
  }
}
