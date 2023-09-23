import {  Type } from '@nestjs/common';
import { IsString, IsDate, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateActorDto } from 'src/actors/dto/create-actor.dto';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  rating_classification: string;

  @IsString()
  description: string;

  @IsDate()
  release_date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  actors?: CreateActorDto[];
}
