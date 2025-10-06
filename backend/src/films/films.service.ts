import { Injectable, Inject } from '@nestjs/common';

import { FilmsMongoDBRepository } from '../repository/filmsMongoDB.repository';
import { FilmsPostgreSQLRepository } from '../repository/filmsPostgreSQL.repository';
import { NotFoundException } from '../exceptions/not-found-exception';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | FilmsMongoDBRepository
      | FilmsPostgreSQLRepository,
  ) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getSheduleFilm(id: string) {
    try {
      const film = await this.filmsRepository.findFilmById(id);
      return {
        total: film.schedule.length,
        items: film.schedule,
      };
    } catch {
      throw new NotFoundException();
    }
  }
}
