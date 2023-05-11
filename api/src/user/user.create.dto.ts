import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserTier } from './user.interface';
import {
  PASSWORD_MIN_CHAR,
  PASSWORD_MIN_LOWER_CASE,
  PASSWORD_MIN_NUMERALS,
  PASSWORD_MIN_SPECIAL_CHAR,
  PASSWORD_MIN_UPPER_CASE,
  PASSWORD_REGEXP,
} from 'src/crypto/crypto.interface';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The username of user in email.',
    default: 'test@gmail.com',
  })
  readonly username: string;

  @IsString()
  @Matches(PASSWORD_REGEXP, {
    message:
      `password must be consist of at least ${PASSWORD_MIN_CHAR} characters, ` +
      `at least ${PASSWORD_MIN_LOWER_CASE} lower case letters, ` +
      `at least ${PASSWORD_MIN_UPPER_CASE} upper case letters, ` +
      `at least ${PASSWORD_MIN_NUMERALS} numerals, ` +
      `at least ${PASSWORD_MIN_SPECIAL_CHAR} special characters, `,
  })
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
