import { Injectable, Inject } from '@nestjs/common';

import { FilmsMongoDBRepository } from '../repository/filmsMongoDB.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository: FilmsMongoDBRepository,
  ) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getSheduleFilm(id: string) {
    const film = await this.filmsRepository.findFilmById(id);
    return {
      total: film.schedule.length,
      items: film.schedule,
      film: film
    };
  }
}
