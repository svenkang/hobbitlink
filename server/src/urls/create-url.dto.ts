import { IsString, IsUrl } from 'class-validator';

export class CreateHobbitUrlDto {
  @IsUrl()
  readonly url: string;

  @IsString()
  readonly hobbit: string;
}
