import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Welcome to the Ecommerce REST API made with NestJs, Typeorm, PostgreSQL`;
  }
}
