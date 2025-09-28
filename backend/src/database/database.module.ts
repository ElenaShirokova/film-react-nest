import { Module, DynamicModule, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { applicationConfig } from '../app.config.provider';
import { Film, FilmSchema } from '../films/schemas/film.schema';
import { FilmsMongoDBRepository } from '../repository/filmsMongoDB.repository';

@Module({})
export class DatabaseModule {
  static register(dbms: string): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];
    const exports = [];

    switch (dbms) {
      case 'mongodb':
        imports.push(
          MongooseModule.forRoot(applicationConfig.DATABASE_URL),
          MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsMongoDBRepository,
        });
        exports.push('FILMS_REPOSITORY');
        break;
    }

    return {
      module: DatabaseModule,
      imports,
      providers,
      exports,
    };
  }
}
