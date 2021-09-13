import { IsString, IsUrl } from 'class-validator';

export class CreateHobbitLinkDto {
  @IsUrl()
  readonly url: string;

  @IsString()
  readonly hobbitLink: string;
}
