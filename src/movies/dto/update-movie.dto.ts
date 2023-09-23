import { IsString, IsDate, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateActorDto } from 'src/actors/dto/create-actor.dto';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  rating_classification?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  release_date?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  actors?: CreateActorDto[];
}
