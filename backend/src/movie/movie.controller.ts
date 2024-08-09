import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { MovieResponseDto } from './dto/response/movie-response.dto';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadPosterDto } from './dto/request/upload-poster.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
  ) {
    return this.movieService.findAll(page, limit);
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<MovieResponseDto> {
    return this.movieService.create(createMovieDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MovieResponseDto> {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<MovieResponseDto> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UploadPosterDto,
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const url = `${process.env.BASE_URL}/public/uploads/${file.filename}`;
    console.log(url);
    return { url };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async test() {
    return { test: 'test' };
  }
}
