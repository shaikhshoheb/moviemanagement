export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly remember: boolean;
  readonly email: string;
}
export class loginDto {
  readonly username: string;
  readonly password: string;
}
