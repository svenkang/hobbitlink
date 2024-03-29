import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local.guard';
import { User } from 'src/user/user.entity';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Public()
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
  public login(@Request() request): Partial<User> {
    return request.user;
  }

  @Public()
  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  @ApiTags('logout')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  public logout(@Request() request): void {
    request.logout((error) => {
      if (error) {
        throw new UnauthorizedException();
      }
    });
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiTags('me')
  @ApiOkResponse()
  public me(@Request() request): Partial<User> {
    const user = request?.user as Partial<User>;
    return user;
  }
}
