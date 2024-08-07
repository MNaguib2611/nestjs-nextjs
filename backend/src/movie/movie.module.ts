import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Genre } from './genre.entity';
import { MovieService } from './services/movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
