import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsBoolean()
  readonly remember: boolean;

  @IsEmail()
  readonly email: string;
}
export class LoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
