import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'Username of the user' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: 'Password of the user' })
  readonly password: string;

  @IsBoolean()
  @ApiProperty({ description: 'Flag indicating whether to remember the user' })
  readonly remember: boolean;

  @IsEmail()
  @ApiProperty({ description: 'Email address of the user' })
  readonly email: string;
}
export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Username of the user: sam' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: 'Password of the user: houston' })
  readonly password: string;
}
