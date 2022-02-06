import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { HOBBIT_LINK_MAX_CHAR, HOBBIT_LINK_MIN_CHAR } from './urls.interface';

export class CreateHobbitLinkDto {
  @IsUrl()
  @ApiProperty({
    description: 'The url to be shortened.',
    default: 'https://www.google.com',
  })
  readonly url: string;

  @IsString()
  @Matches(
    new RegExp(`^[\\w-]{${HOBBIT_LINK_MIN_CHAR},${HOBBIT_LINK_MAX_CHAR}}$`),
    {
      message:
        `hobbitLink must be consist of ${HOBBIT_LINK_MIN_CHAR}-${HOBBIT_LINK_MAX_CHAR} ` +
        'digits of alphanumeric & underscore & hyphen characters',
    },
  )
  @IsOptional()
  @ApiPropertyOptional({
    description: `An optional ${HOBBIT_LINK_MIN_CHAR}-${HOBBIT_LINK_MAX_CHAR} digit hash to shorten the url to.`,
    default: 'd2_fs',
  })
  readonly hobbitLink?: string;
}
