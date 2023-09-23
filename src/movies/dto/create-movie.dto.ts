import {  Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateActorDto } from 'src/actors/dto/create-actor.dto';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({ description: 'Title of the movie' })
  title: string;

  @IsString()
  @ApiProperty({ description: 'Rating classification of the movie' })
  rating_classification: string;

  @IsString()
  @ApiProperty({ description: 'Description of the movie' })
  description: string;

  @IsDate()
  @ApiProperty({ description: 'Release date of the movie' })
  release_date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @ApiProperty({
    type: CreateActorDto,
    isArray: true,
    description: 'Array of actors in the movie (optional)',
  })
  actors?: CreateActorDto[];
}
