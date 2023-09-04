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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';

@ApiTags('order-item')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order-item')
export class OrdersItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return this.orderItemService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.findOne(id);
  }

  @Roles(Role.CUSTOMER)
  @Post()
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemService.create(data);
  }

  @Roles(Role.CUSTOMER)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, data);
  }

  @Roles(Role.CUSTOMER)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.orderItemService.remove(id);
  }
}
