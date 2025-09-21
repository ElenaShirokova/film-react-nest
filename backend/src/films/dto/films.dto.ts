import { IsString, IsNumber, IsArray } from 'class-validator';

export class FilmDto {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  cover: string;
  @IsArray()
  schedule: SheduleDto[];
}

export class SheduleDto {
  @IsString()
  id: string;
  @IsString()
  daytime: string;
  @IsString()
  hall: string;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  taken: string[];
}

export class GetFilmsDto {
  @IsNumber()
  total: number;
  @IsArray()
  items: FilmDto[];
}

export class GetFilmDTO {
  @IsNumber()
  total: number;
  @IsArray()
  items: SheduleDto[];
}
