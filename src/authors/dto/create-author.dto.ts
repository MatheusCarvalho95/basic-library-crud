import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  booksIds: number[];
}
