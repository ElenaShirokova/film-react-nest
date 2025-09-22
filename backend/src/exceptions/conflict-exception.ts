import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor() {
    super('Конфликт данных', HttpStatus.CONFLICT);
  }
}
