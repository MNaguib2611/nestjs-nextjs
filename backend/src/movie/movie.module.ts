import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieService } from './services/movie.service';
import { MovieController } from './movie.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, User])],
  providers: [MovieService, UsersService, AuthService, JwtService],
  controllers: [MovieController],
})
export class MovieModule {}
