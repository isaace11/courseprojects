import type { BookInterface } from '@/interfaces/BookInterface';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO';
import { useBookStore } from '@/stores/bookstore';

export class BookService {
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find((book) => book.id === id);
  }

  static createBook(book: CreateBookDTO): void {
    const id = useBookStore().books.length + 1;

    useBookStore().books.push({
      id,
      ...book,
    });
  }

  static deleteLastBook(): void {
    const bookStore = useBookStore();

    if (bookStore.books.length > 0) {
      bookStore.books.pop();
    }
  }
}
