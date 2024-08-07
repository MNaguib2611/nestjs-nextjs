import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john',
  })
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
