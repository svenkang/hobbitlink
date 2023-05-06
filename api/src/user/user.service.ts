import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './user.post.dto';
import { UpdateUserDto } from './user.put.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'The requested user could not be found.',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      return;
    }
    return this.userRepository.update({ id, ...updateUserDto }, user);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
