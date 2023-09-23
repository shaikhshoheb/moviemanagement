import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateActorDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Updated name of the actor (optional)' })
  readonly name?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'Updated date of birth of the actor (optional)' })
  readonly born?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'Updated date of death of the actor (optional)' })
  readonly died?: Date;
}
