import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from 'src/books/books.repository';
import { Book } from 'src/books/entities/book.entity';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,

    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}
  async create(newAuthorRequest: CreateAuthorDto): Promise<Author> {
    const existingAuthor = await this.authorRepository.findOne({
      where: { name: newAuthorRequest.name },
    });
    if (existingAuthor) {
      throw new ConflictException(
        `There is already an Author with name: ${newAuthorRequest.name} `,
      );
    }

    const books: Book[] = [];
    if (newAuthorRequest?.booksIds?.length) {
      for (const id of newAuthorRequest.booksIds) {
        books.push(await this.bookRepository.findOne(id));
      }
    }
    return this.authorRepository.save({ name: newAuthorRequest.name, books });
  }

  async findAll() {
    return await this.authorRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    try {
      return await this.authorRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException(`Cannot find an author with id: ${id}`);
    }
  }

  async update(id: number, updateAuthorRequest: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne(id);
    if (!author) {
      throw new NotFoundException(`Cannot find an author with id: ${id}`);
    }

    const authorWithSameName = await this.authorRepository.findOne({
      where: { name: updateAuthorRequest.name },
    });

    if (authorWithSameName.id !== id) {
      throw new ConflictException(
        `There is another author with the name: ${updateAuthorRequest.name}`,
      );
    }

    author.books = [];

    const books: Book[] = [];
    if (updateAuthorRequest?.booksIds?.length) {
      for (const id of updateAuthorRequest.booksIds) {
        const book = await this.bookRepository.findOne(id);
        if (book) books.push(book);
      }
    }

    return await this.authorRepository.save(
      this.authorRepository.merge(author, {
        name: updateAuthorRequest.name,
        books,
      }),
    );
  }

  async remove(id: number) {
    return await this.authorRepository.delete(id);
  }
}
