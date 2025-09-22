import { Injectable, Inject } from '@nestjs/common';

import { FilmsMongoDBRepository } from '../repository/filmsMongoDB.repository';
import { ResponseOrderDto, CreateOrderDto } from './dto/order.dto';
import { NotFoundException } from '../exceptions/not-found-exception';
import { ConflictException } from '../exceptions/conflict-exception';
import { AlreadyExistsException } from '../exceptions/bad-request-exception';

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
        try {
          const film = await this.filmsRepository.findFilmById(ticket.film);
          const filmObj = film.toObject();
          const scheduleIndex = filmObj.schedule.findIndex(
            (s) => s.id === ticket.session,
          );
          if (scheduleIndex === -1) {
            throw new NotFoundException();
          }
          const place = `${ticket.row}:${ticket.seat}`;
          if (filmObj.schedule[scheduleIndex].taken.includes(place)) {
            throw new AlreadyExistsException();
          }
          const scheduleTakenPlace = `schedule.${scheduleIndex.toString()}.taken`;
          try {
            await film.updateOne({ $push: { [scheduleTakenPlace]: place } });
          } catch (error) {
            throw new ConflictException();
          }
        } catch {
          throw new NotFoundException();
        }
      }
    }
    return { items: tickets, total: tickets.length };
  }
}
