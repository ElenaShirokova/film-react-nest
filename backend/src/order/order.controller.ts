import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { AllExceptionFilter } from '../exceptions/exception-filter';

@Controller('order')
@UseFilters(AllExceptionFilter)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrder: CreateOrderDto) {
    return this.orderService.createOrder(createOrder);
  }
}
