import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppController } from './app.controller';
import { CreateProductDto } from './dtos/create-product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(
    @InjectModel('Products') private readonly productModel: Model<IProduct>
  ) {
  }

  async createProduct(createProductDto: CreateProductDto): Promise<any> {
    try {
      const createProduct = new this.productModel(createProductDto)
      return await createProduct.save();
    } catch (error) {
      this.logger.error(`Error ${JSON.stringify(error.massage, null, 2)}`);
      throw new RpcException(error.message)
    }
  }

}
