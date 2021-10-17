import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { BookRepository } from 'src/books/books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository, BookRepository])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
