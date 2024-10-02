import {
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsString()
  search: string;
}
