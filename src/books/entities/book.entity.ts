import { Author } from 'src/authors/entities/author.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({ name: 'book_author' })
  authors: Author[];
}
