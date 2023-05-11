import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserTier } from './user.interface';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The username of user in email.',
    default: 'test@gmail.com',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    default: 'password',
  })
  readonly password: string;

  @IsEnum(UserTier)
  @IsOptional()
  @ApiProperty({
    description: 'The tier of the user',
    default: UserTier.BASIC,
    enum: UserTier,
  })
  readonly userTier?: UserTier;
}
