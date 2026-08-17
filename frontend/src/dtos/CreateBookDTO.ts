import type { BookInterface } from '@/interfaces/BookInterface';

export type CreateBookDTO = Omit<BookInterface, 'id'>;

// cuando se crea el libro, el usuario no debe escribir el id

