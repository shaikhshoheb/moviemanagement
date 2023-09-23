import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateActorDto } from 'src/actors/dto/create-actor.dto';

export class UpdateMovieDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Updated title of the movie (optional)' })
    title?: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Updated rating classification of the movie (optional)' })
    rating_classification?: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Updated description of the movie (optional)' })
    description?: string;
  
    @IsDate()
    @IsOptional()
    @ApiProperty({ description: 'Updated release date of the movie (optional)' })
    release_date?: Date;
  
    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @ApiProperty({
      type: CreateActorDto,
      isArray: true,
      description: 'Updated array of actors in the movie (optional)',
    })
    actors?: CreateActorDto[];
}
