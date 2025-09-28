import { DataSource } from 'typeorm';
import { applicationConfig } from 'src/app.config.provider';
import { FilmEntity } from 'src/entities/film.entity';
import { ScheduleEntity } from 'src/entities/schedule.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: applicationConfig.DATABASE_HOST,
  port: Number(applicationConfig.DATABASE_PORT),
  username: applicationConfig.DATABASE_USERNAME,
  password: applicationConfig.DATABASE_PASSWORD,
  database: applicationConfig.DATABASE_NAME,
  entities: [FilmEntity, ScheduleEntity],
  migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
  synchronize: false,
});