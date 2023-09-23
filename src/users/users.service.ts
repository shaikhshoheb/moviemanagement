import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(this.usersRepository.create(createUserDto));
  }
  
  async login(username: string, password: string): Promise<User> {
    // Implement your login logic here, e.g., query the database for the user
    const user = await this.usersRepository.findOne({ where: { username } });
    console.log("user",user)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password && user.password==="inscure"){
      return user;
    }else{
      throw new UnauthorizedException('Invalid password');
    }

    // Check the password (you should use bcrypt or a similar library for secure password hashing)
    // const isPasswordValid = await this.authService.comparePasswords(password, user.password);

    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid password');
    // }

  }

  findAll(): Promise<User[]> {
    console.log(this.usersRepository)
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `wasim This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `wasun This action updates a #${id} user`;
  }

  remove(id: number) {
    return `wasim 2 This action removes a #${id} user`;
  }
}
