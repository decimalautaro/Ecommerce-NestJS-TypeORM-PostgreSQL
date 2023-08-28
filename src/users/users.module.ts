import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
