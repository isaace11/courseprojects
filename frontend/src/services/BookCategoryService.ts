import { BookService } from './BookService';

export default class BookCategoryService {
  public static getUniqueBookCategories(): string[] {
    const books = BookService.getBooks();
    const bookCategories = books.map((book) => book.category);
    const uniqueBookCategories = new Set(bookCategories);

    return Array.from(uniqueBookCategories);
  }
}
