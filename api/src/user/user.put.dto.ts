import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.post.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
