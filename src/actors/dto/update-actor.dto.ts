import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateActorDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsDate()
  readonly born?: Date;

  @IsOptional()
  @IsDate()
  readonly died?: Date;
}
