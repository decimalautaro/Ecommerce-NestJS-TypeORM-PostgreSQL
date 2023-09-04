import {
  Controller,
  Post,
  Param,
  Get,
  Put,
  Delete,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('order-item')
@UseGuards(JwtAuthGuard)
@Controller('order-item')
export class OrdersItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get()
  async findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.orderItemService.remove(id);
  }
}
