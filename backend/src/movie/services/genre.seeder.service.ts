import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../genre.entity';
import { genresData } from '../../constants/genres';

@Injectable()
export class GenreSeederService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async seedGenres(): Promise<number> {
    const count = await this.genreRepository.count();
    if (count === 0) {
      const genres = this.genreRepository.create(genresData);
      await this.genreRepository.save(genres);
      console.log(`Seeded ${genres.length} genres.`);
      return genres.length;
    }
    console.log('Genres are already seeded.');
    return count;
  }
}
