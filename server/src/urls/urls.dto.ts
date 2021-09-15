import { IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { HOBBIT_LINK_MAX_CHAR, HOBBIT_LINK_MIN_CHAR } from './urls.service';

export class CreateHobbitLinkDto {
  @IsUrl()
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
  readonly hobbitLink?: string;
}
