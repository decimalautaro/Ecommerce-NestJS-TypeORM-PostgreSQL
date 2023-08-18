import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('/')
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('product') product: string,
  ) {
    return `limit => ${limit} and offset => ${offset} and product: ${product}`;
  }

  @Get('/filter')
  getFilter() {
    return `yo soy un filter`;
  }

  @Get('/:producId')
  getOne(@Param('producId') producId: number) {
    return {
      message: `product ${producId}`,
    };
  }
  @Post('/')
  create(@Body() payload: any) {
    return {
      message: 'creando product',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
