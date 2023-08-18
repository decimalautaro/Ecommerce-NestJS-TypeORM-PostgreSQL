import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

import { Response, response } from 'express';

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
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Res() response: Response, @Param('id') id: number) {
    response.status(200).send({
      message: `brand id: ${id}`,
    });
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
