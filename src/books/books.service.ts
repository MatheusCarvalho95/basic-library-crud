import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository } from 'src/authors/author.repository';
import { Author } from 'src/authors/entities/author.entity';
import { BookRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,

    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  async create(newBookRequest: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findOne({
      where: { title: newBookRequest.title },
    });
    if (existingBook) {
      throw new ConflictException(
        `There is already a book with the name: ${newBookRequest.title} `,
      );
    }
    const authors: Author[] = [];
    if (newBookRequest?.authorsIds?.length) {
      for (const id of newBookRequest?.authorsIds) {
        authors.push(await this.authorRepository.findOne(id));
      }
    }

    return await this.bookRepository.save({
      title: newBookRequest.title,
      coverUrl: newBookRequest.coverUrl,
      authors,
    });
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: ['authors'],
    });
  }

  async findOne(id: number) {
    try {
      return await this.bookRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException(`Could not found a book with id: ${id}`);
    }
  }

  async update(id: number, updateBookRequest: UpdateBookDto) {
    const book = await this.bookRepository.findOne(id, {
      relations: ['authors'],
    });
    if (!book) {
      throw new NotFoundException(`Could not found a book with id: ${id}`);
    }

    const bookWithSameName = await this.bookRepository.findOne({
      where: { title: updateBookRequest.title },
    });

    if (bookWithSameName.id !== id) {
      throw new ConflictException(
        `There is another book with the title: ${updateBookRequest.title}`,
      );
    }

    book.authors = [];

    const authors: Author[] = [];

    if (updateBookRequest?.authorsIds?.length) {
      for (const id of updateBookRequest?.authorsIds) {
        const author = await this.authorRepository.findOne(id);
        if (author) authors.push(author);
      }
    }

    return await this.bookRepository.save(
      this.bookRepository.merge(book, {
        title: updateBookRequest.title,
        coverUrl: updateBookRequest.coverUrl,
        authors,
      }),
    );
  }

  async remove(id: number) {
    return await this.bookRepository.delete(id);
  }
}
