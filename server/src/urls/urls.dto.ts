import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { HOBBIT_LINK_MAX_CHAR, HOBBIT_LINK_MIN_CHAR } from './urls.service';

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
        'hobbitLink must be 1-5 digits of alphanumeric & underscore & hyphen',
    },
  )
  @IsOptional()
  @ApiPropertyOptional({
    description: 'An optional five digit hash to shorten the url to.',
    default: 'd2_fs',
  })
  readonly hobbitLink?: string;
}
