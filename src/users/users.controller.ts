import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto,loginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator'; // Import the validate function


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: loginDto) {
    // Validate the login DTO using class-validator
    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    // Implement your login logic here
    const { username, password } = loginDto;
    console.log(loginDto)
    const user = await this.usersService.login(username, password);

    // Return the appropriate response
    return {
      user_id: user.id,
      name: user.username, // Adjust as per your user entity structure
      email: user.email,
    };
  }
  @Get('logout')
  async logout(){
    return {"user_id":2}
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
