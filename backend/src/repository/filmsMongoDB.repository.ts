import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilmDto, GetFilmsDto } from '../films/dto/films.dto';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsMongoDBRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  private getFilmFromDataBaseFn(): (filmDataBase: FilmDto) => FilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async findAllFilms(): Promise<GetFilmsDto> {
    const items = await this.filmModel.find({}).lean();
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: items.map(this.getFilmFromDataBaseFn()),
    };
  }

  async findFilmById(id: string): Promise<FilmDocument> {
    try {
      const film = await this.filmModel.findOne({ id });
      return film;
    } catch {
      throw new NotFoundException(`Фильм с таким Id ${id} не найден`);
    }
  }

  async findScheduleIndexInFilm(filmId: string, session: string) {
    const film = (await this.findFilmById(filmId)).toObject();
    const scheduleIndex = film.schedule.findIndex((s) => s.id === session);
    if (scheduleIndex === -1) {
      throw new NotFoundException(`Для фильма '${film.title}' нет расписания`);
    }
    return scheduleIndex;
  }
}
