import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(data);

    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, data: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customerRepository.merge(customer, data);
    return this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOne({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return this.customerRepository.delete(id);
  }
}
