import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';


describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  const mockFilmsService = {
    getAllFilms: jest.fn(),
    getSheduleFilm: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('should return all films', async () => {
      const mockFilms = {
        total: 2,
        items: [
          { id: '1', title: 'Film 1' },
          { id: '2', title: 'Film 2' },
        ],
      };

      mockFilmsService.getAllFilms.mockResolvedValue(mockFilms);

      const result = await controller.getFilms();

      expect(filmsService.getAllFilms).toHaveBeenCalled();
      expect(result).toEqual(mockFilms);
    });
  });

  describe('getShedule', () => {
    it('should return schedule for specific film', async () => {
      const filmId = 'test-film-id';
      const mockSchedule = {
        total: 1,
        items: [
          { id: 'sched-1', daytime: '18:00', hall: 1 },
        ],
      };

      mockFilmsService.getSheduleFilm.mockResolvedValue(mockSchedule);

      const result = await controller.getShedule(filmId);

      expect(filmsService.getSheduleFilm).toHaveBeenCalledWith(filmId);
      expect(result).toEqual(mockSchedule);
    });
  });
});