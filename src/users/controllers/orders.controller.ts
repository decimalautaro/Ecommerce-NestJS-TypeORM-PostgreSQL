import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  ParseIntPipe,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('orders')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
