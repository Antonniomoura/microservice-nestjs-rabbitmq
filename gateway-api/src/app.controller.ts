import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('api/v1')
export class AppController {
  private clientAdminBackend: ClientProxy;
  private logger: Logger = new Logger(AppController.name);

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_SERVER],
        queue: process.env.QUEUE_NAME
      }
    })
  }

  @Post('')
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ) {
    return await this.clientAdminBackend.emit(process.env.CREATE_PRODUCT, createProductDto)
  }

}
