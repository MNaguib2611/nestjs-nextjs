import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  publishingYear?: number;

  @IsString()
  @IsOptional()
  poster?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  genreIds?: number[];
}
