import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Test Movie',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 1993,
  })
  @IsInt()
  publishingYear: number;

  @ApiProperty({
    example:
      'http://localhost:9000/public/uploads/file-1723064382490-764791048.png',
  })
  @IsString()
  @IsOptional()
  poster?: string;

  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsArray()
  @IsInt({ each: true })
  genreIds: number[];
}
