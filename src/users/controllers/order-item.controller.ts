import {
  Controller,
  Post,
  Param,
  Get,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrdersItemController {
  constructor(private orderItemService: OrderItemService) {}
  @Post()
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemService.create(data);
  }
}
