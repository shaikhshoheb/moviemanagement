import { Type } from '@nestjs/common';
import { IsString, IsDate, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

export class CreateActorDto {
  @IsString()
  readonly name: string;
  @IsDate()
  readonly born: Date;
  @IsDate()
  @IsOptional()
  readonly died?: Date;
}
