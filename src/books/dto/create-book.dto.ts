import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  coverUrl: string;

  @IsOptional()
  authorsIds: number[];
}
