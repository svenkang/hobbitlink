import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.create.dto';
import { UpdateUserDto } from './user.update.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserLog, UserTier } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
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
  @ApiQuery({
    name: 'userTier',
    required: false,
    description: 'tier of the user',
    enum: UserTier,
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'The given request body is not valid.',
  })
  @ApiConflictResponse({
    description: UserLog.DUPLICATE,
  })
  @ApiInternalServerErrorResponse({
    description: UserLog.CREATE_FAILED,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiTags('user')
  @ApiOkResponse()
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiTags('user')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the user',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'The given request param is not valid.',
  })
  @ApiNotFoundResponse({
    description: UserLog.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @ApiTags('user')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the user',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'The given request param is not valid.',
  })
  @ApiNotFoundResponse({
    description: UserLog.NOT_FOUND,
  })
  @ApiInternalServerErrorResponse({
    description: UserLog.UPDATE_FAILED,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiTags('user')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the user',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'The given request param is not valid.',
  })
  @ApiNotFoundResponse({
    description: UserLog.NOT_FOUND,
  })
  @ApiInternalServerErrorResponse({
    description: UserLog.DELETE_FAILED,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
