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

@Controller('categories')
export class CategoriesController {
  @Get('/')
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('category') category: string,
  ) {
    return {
      message: `limit => ${limit} and offset => ${offset} and category: ${category}`,
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return {
      message: `category id: ${id}`,
    };
  }
  @Post('/')
  create(@Body() payload: any) {
    return {
      message: 'creando category',
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