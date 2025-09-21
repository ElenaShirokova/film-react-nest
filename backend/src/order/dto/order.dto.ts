import {
  IsString,
  IsNumber,
  IsEmail,
  IsMobilePhone,
  IsArray,
} from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;
  @IsMobilePhone('ru-RU')
  phone: string;
  @IsArray()
  tickets: TicketDto[];
}

export class ResponseOrderDto {
  @IsNumber()
  total: number;
  @IsArray()
  items: TicketDto[];
}
