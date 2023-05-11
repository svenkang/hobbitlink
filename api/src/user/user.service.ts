import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './user.create.dto';
import { UpdateUserDto } from './user.update.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLog } from './user.interface';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
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

    const { key, hash } = this.cryptoService.getHmac(createUserDto.password);

    try {
      const newUser = await this.userRepository.save({
        ...createUserDto,
        passwordKey: key,
        password: hash,
      });
      return {
        id: newUser.id,
        username: newUser.username,
        userTier: newUser.userTier,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };
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
    return await this.userRepository.find({
      select: {
        id: true,
        username: true,
        userTier: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        userTier: true,
        createdAt: true,
        updatedAt: true,
      },
    });
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
      const updatedUser = await this.userRepository.save({
        id,
        ...updateUserDto,
      });
      return {
        id: updatedUser.id,
        username: updatedUser.username,
        userTier: updatedUser.userTier,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };
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
