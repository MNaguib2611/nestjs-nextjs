import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movie.entity';
import { CreateMovieDto } from '../dto/request/create-movie.dto';
import { UpdateMovieDto } from '../dto/request/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ movies: Movie[]; total: number }> {
    const [movies, total] = await this.movieRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { movies, total };
  }
  findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne({ where: { id } });
  }

  create(movie: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async update(id: number, movieData: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOneOrFail({
      where: { id },
    });
    this.movieRepository.merge(movie, movieData);
    return this.movieRepository.save(movie);
  }
}
