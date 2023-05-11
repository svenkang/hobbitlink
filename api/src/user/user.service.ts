import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './user.create.dto';
import { UpdateUserDto } from './user.update.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLog } from './user.interface';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (user) {
      throw new HttpException(UserLog.DUPLICATE, HttpStatus.CONFLICT);
    }
    try {
      return await this.userRepository.save(createUserDto);
    } catch (exception) {
      this.logger.debug({ createUserDto });
      this.logger.error(exception);
      throw new HttpException(
        UserLog.CREATE_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(UserLog.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(UserLog.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    try {
      return await this.userRepository.save({ id, ...updateUserDto });
    } catch (exception) {
      this.logger.debug({ prev: user, next: { id, ...updateUserDto } });
      this.logger.error(exception);
      throw new HttpException(
        UserLog.UPDATE_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(UserLog.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    try {
      await this.userRepository.delete({ id });
    } catch (exception) {
      this.logger.debug({ id });
      this.logger.error(exception);
      throw new HttpException(
        UserLog.DELETE_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
