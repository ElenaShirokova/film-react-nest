import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor() {
    super('Объект уже используется!', HttpStatus.BAD_REQUEST);
  }
}
