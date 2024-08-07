import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { GenreSeederService } from './movie/services/genre.seeder.service';
import { Genre } from './movie/genre.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33066,
      username: 'root',
      password: 'password',
      database: 'mydb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MovieModule,
    TypeOrmModule.forFeature([Genre]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads'),
      serveRoot: '/public/uploads',
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, GenreSeederService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly genreSeederService: GenreSeederService,
    private readonly usersService: UsersService,
  ) {}
  async onModuleInit() {
    await this.genreSeederService.seedGenres();
    await this.usersService.create({
      username: 'john',
      password: 'password',
    });
  }
}
