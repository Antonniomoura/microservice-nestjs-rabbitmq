import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IProduct } from './interfaces/product.interface';


const ackErrors: string[] = ['E11000']

@Controller()
export class AppController {
  private logger: Logger = new Logger()

  constructor(private readonly appService: AppService) { }

  @EventPattern('create-product')
  async createProduct(
    @Payload() product: IProduct,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(`Product: ${JSON.stringify(product)}`);

    try {
      await this.appService.createProduct(product);
      await channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      ackErrors.map(async () => {
        if (error.message.includes(ackErrors)) {
          await channel.ack(originalMsg)
        }
      })
    }
  }
}
