import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Данные не найдены', HttpStatus.NOT_FOUND);
  }
}
