import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movie.entity';
import { CreateMovieDto } from '../dto/request/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['genres'] });
  }

  create(movie: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async update(id: number, movieData: Partial<Movie>): Promise<Movie> {
    const movie = await this.movieRepository.findOneOrFail({ where: { id } });
    this.movieRepository.merge(movie, movieData);
    return this.movieRepository.save(movie);
  }
}
