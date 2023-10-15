import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local.guard';
import { User } from 'src/user/user.entity';
import { IsPublic } from './auth.guard';

@Controller('auth')
export class AuthController {
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiTags('login')
  @ApiQuery({
    name: 'username',
    required: true,
    description: 'username of the user',
  })
  @ApiQuery({
    name: 'password',
    required: true,
    description: 'password of the user',
  })
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: 'Failed to login' })
  public login(@Request() req): Partial<User> {
    return req.user;
  }
}
