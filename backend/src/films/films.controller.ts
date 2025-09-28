import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { FilmsService } from './films.service';
import { AllExceptionFilter } from '../exceptions/exception-filter';

@Controller('films')
@UseFilters(AllExceptionFilter)
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmService.getAllFilms();
  }

  @Get(':id/schedule')
  getShedule(@Param('id') id: string) {
    return this.filmService.getSheduleFilm(id);
  }
}
