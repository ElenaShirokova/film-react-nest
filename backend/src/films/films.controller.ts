import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
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
