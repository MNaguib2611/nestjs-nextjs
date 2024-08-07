import { ApiProperty } from '@nestjs/swagger';

export class UploadPosterDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  file: any;
}
