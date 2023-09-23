import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

export class CreateActorDto {
  @IsString()
  @ApiProperty({ description: 'Name of the actor' })
  readonly name: string;

  @IsDate()
  @ApiProperty({ description: 'Date of birth of the actor' })
  readonly born: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'Date of death of the actor (optional)' })
  readonly died?: Date;
}
