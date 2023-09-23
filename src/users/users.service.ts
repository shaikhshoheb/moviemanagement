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

    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password && user.password==="inscure"){
      return user;
    }else{
      throw new UnauthorizedException('Invalid password');
    }
  }

  findAll(): Promise<User[]> {
    console.log(this.usersRepository)
    return this.usersRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return ` This action updates a #${id} user`;
  }

}
