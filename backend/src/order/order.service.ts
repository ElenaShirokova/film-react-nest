import { Injectable, Inject } from '@nestjs/common';
import { BadRequestException, ConflictException } from '@nestjs/common';

import { FilmsMongoDBRepository } from '../repository/filmsMongoDB.repository';
import { ResponseOrderDto, CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository: FilmsMongoDBRepository,
  ) {}

  async createOrder(orderData: CreateOrderDto): Promise<ResponseOrderDto> {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      if (this.filmsRepository instanceof FilmsMongoDBRepository) {
        const film = (
          await this.filmsRepository.findFilmById(ticket.film)
        ).toObject();
        const scheduleIndex =
          await this.filmsRepository.findScheduleIndexInFilm(
            ticket.film,
            ticket.session,
          );
        const place = `${ticket.row}:${ticket.seat}`;

        if (film.schedule[scheduleIndex].taken.includes(place)) {
          throw new BadRequestException(`Место ${place} уже забронировано`);
        }
        this.updateOccupiedSeatsFilmSession(ticket.film, scheduleIndex, place);
      }
    }
    return { items: tickets, total: tickets.length };
  }

  async updateOccupiedSeatsFilmSession(
    filmId: string,
    scheduleIndex: number,
    place: string,
  ): Promise<void> {
    if (this.filmsRepository instanceof FilmsMongoDBRepository) {
      const film = await this.filmsRepository.findFilmById(filmId);
      const scheduleTakenPlace = `schedule.${scheduleIndex.toString()}.taken`;
      try {
        await film.updateOne({ $push: { [scheduleTakenPlace]: place } });
      } catch (error) {
        new ConflictException('Ошибка обновления данных');
      }
    }
  }
}
