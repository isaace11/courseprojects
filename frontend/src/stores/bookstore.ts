import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { BookInterface } from '@/interfaces/BookInterface';

export const useBookStore = defineStore('book', () => {
  const books = ref<BookInterface[]>([]);

  return {
    books,
  };
});
// ahora pinia será el lugar donde vive el estado de los libros
// bookstore.ts contiene el estado actual de la aplicación

