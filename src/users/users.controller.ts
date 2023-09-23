import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto,LoginDto } from './dto/create-user.dto';
import { validate } from 'class-validator';  

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto,@Session() session: Record<string, any>) {
    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    const { username, password } = loginDto;
    const user = await this.usersService.login(username, password);

    session.user = {
      user_id: user.id,
      name: user.username,
      email: user.email,
    };
    console.log(session.user)


    return {
      user_id: user.id,
      name: user.username,  
      email: user.email,
    };
  }
  @Get('logout')
  logout(@Session() session: Record<string, any>){
    if (session.user) {
      const user_id= session.user.user_id;
      session.destroy();
      return { user_id: user_id };
    } else {
      throw new UnauthorizedException('User not authenticated');
    }
  }
  @Get('profile')
  getProfile(@Session() session: Record<string, any>) {
    if (session.user) {
      return session.user;
    } else {
      throw new UnauthorizedException('User not authenticated');
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

}
