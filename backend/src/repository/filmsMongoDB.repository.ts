import { Injectable } from '@nestjs/common';
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
    return await this.filmModel.findOne({ id });
  }
}
