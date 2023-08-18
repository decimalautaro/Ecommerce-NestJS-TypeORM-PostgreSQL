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

@Controller('orders')
export class OrdersController {
  @Get('/')
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('order') order: string,
  ) {
    return {
      message: `limit => ${limit} and offset => ${offset} and order: ${order}`,
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return {
      message: `order id: ${id}`,
    };
  }
  @Post('/')
  create(@Body() payload: any) {
    return {
      message: 'creando order',
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
