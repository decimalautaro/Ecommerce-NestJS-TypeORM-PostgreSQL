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

@Controller('brands')
export class BrandsController {
  @Get('/')
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `limit => ${limit} and offset => ${offset} and brand: ${brand}`,
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return {
      message: `brand id: ${id}`,
    };
  }
  @Post('/')
  create(@Body() payload: any) {
    return {
      message: 'creando marca',
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
