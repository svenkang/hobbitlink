import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;

  @IsOptional()
  @IsBoolean()
  ordered?: boolean;
}
