import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

import { ProductsService } from '../services/products.service';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Get('/filter')
  getFilter() {
    return `yo soy un filter`;
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
  @Post('/')
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
