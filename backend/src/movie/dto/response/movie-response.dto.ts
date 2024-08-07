import { Genre } from './../../genre.entity';

export class MovieResponseDto {
  id: number;
  title: string;
  publishingYear: number;
  poster: string;
  genres: Genre[];
}
