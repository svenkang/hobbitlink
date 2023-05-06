import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

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
}
