import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import {
  HOBBIT_LINK_MAX_CHAR,
  HOBBIT_LINK_MIN_CHAR,
} from './../urls/urls.interface';

export class GetProxyUrlDto {
  @IsString()
  @Matches(
    new RegExp(`^[\\w-]{${HOBBIT_LINK_MIN_CHAR},${HOBBIT_LINK_MAX_CHAR}}$`),
    {
      message:
        `hobbitLink must be consist of ${HOBBIT_LINK_MIN_CHAR}-${HOBBIT_LINK_MAX_CHAR} ` +
        'digits of alphanumeric & underscore & hyphen characters',
    },
  )
  @ApiProperty({
    description: 'Hobbit link used for proxy a URL.',
    default: 'd2_fs',
  })
  readonly hobbitLink: string;
}
