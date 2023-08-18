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

@Controller('users')
export class UsersController {
  @Get('/')
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('user') user: string,
  ) {
    return {
      message: `limit => ${limit} and offset => ${offset} and user: ${user}`,
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
      message: 'creando user',
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
