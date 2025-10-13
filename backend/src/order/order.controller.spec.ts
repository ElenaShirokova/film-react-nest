import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create order successfully', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [
          {
            film: 'film-1',
            session: 'session-1',
            daytime: '18:00',
            row: 1,
            seat: 5,
            price: 500,
          },
        ],
      };

      const mockResponse = {
        total: 1,
        items: createOrderDto.tickets,
      };

      mockOrderService.createOrder.mockResolvedValue(mockResponse);

      const result = await controller.createOrder(createOrderDto);

      expect(orderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty tickets array', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [],
      };

      const mockResponse = {
        total: 0,
        items: [],
      };

      mockOrderService.createOrder.mockResolvedValue(mockResponse);

      const result = await controller.createOrder(createOrderDto);

      expect(orderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result.total).toBe(0);
    });
  });
});