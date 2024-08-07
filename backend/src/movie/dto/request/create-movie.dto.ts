import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  publishingYear: number;

  @IsString()
  @IsOptional()
  poster?: string;

  // @ApiProperty({
  //   type: 'string',
  //   format: 'binary',
  //   description: 'File to upload',
  // })
  // file: any;

  @IsArray()
  @IsInt({ each: true })
  genreIds: number[];
}
