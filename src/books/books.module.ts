import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { AuthorRepository } from 'src/authors/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository, AuthorRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
