import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto,LoginDto } from './dto/create-user.dto';
import { validate } from 'class-validator';  
import { ApiResponse, ApiTags, ApiOperation, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';


@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login - username:sam, password:houston ' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User has been successfully logged in.' })
  @ApiBadRequestResponse({ description: 'Validation failed' })

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


    return {
      user_id: user.id,
      name: user.username,  
      email: user.email,
    };
  }
  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto);
  }

  @Get('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'User has been successfully logged out.' })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  logout(@Session() session: Record<string, any>){
    if (session.user) {
      const user_id= session.user.user_id;
      session.destroy();
      return { user_id: user_id };
    } else {
      throw new UnauthorizedException('User not authenticated');
    }
  }


  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: CreateUserDto, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

}
