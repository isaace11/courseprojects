<script setup lang="ts">
import { ref, watch } from 'vue';

import { BookService } from '@/services/BookService';
import BookCategoryService from '@/services/BookCategoryService';
import { formatToCOP } from '@/utils/formatters';

const books = BookService.getBooks();
const filteredBooks = ref(books);

const bookCategories = BookCategoryService.getUniqueBookCategories();
const selectedCategory = ref('');

function deleteLastBook(): void {
  BookService.deleteLastBook();
}

watch(selectedCategory, (newCategory) => {
  if (newCategory) {
    filteredBooks.value = books.filter((book) => book.category === newCategory);
  } else {
    filteredBooks.value = books;
  }
});
</script>

<template>
  <section>
    <div class="mx-auto max-w-7xl">
      <div class="mb-6 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-red-700"
          @click="deleteLastBook"
        >
          Delete Last Book
        </button>

        <RouterLink
          to="/books/create"
          class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700"
        >
          <i class="fas fa-plus mr-2"></i>
          Add Book
        </RouterLink>
      </div>

      <div class="mb-6 flex justify-end">
        <select
          v-model="selectedCategory"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        >
          <option value="">All Categories</option>

          <option v-for="category in bookCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="book in filteredBooks" :key="book.id">
          <div
            class="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
          >
            <div class="mb-2 flex items-center justify-between">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ book.title }}
              </h3>

              <span
                v-if="book.stock > 0"
                class="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
              >
                {{ book.stock }} available
              </span>

              <span v-else class="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                Not available
              </span>
            </div>

            <div class="mb-4 flex justify-center">
              <img
                src="https://picsum.photos/seed/picsum/536/354"
                alt="Book Cover"
                class="h-auto w-full rounded object-cover shadow-sm"
              />
            </div>

            <p class="mb-3 text-sm text-gray-500">
              <i class="fas fa-tag mr-2"></i>
              {{ book.category }}
            </p>

            <div class="mb-4 rounded-lg bg-gray-50 p-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Price:</span>
                <span class="font-semibold"> ${{ formatToCOP(book.price) }} COP </span>
              </div>
            </div>

            <div class="flex justify-center">
              <RouterLink
                :to="`/books/${book.id}`"
                class="rounded bg-blue-100 px-3 py-2 font-semibold text-blue-600 transition duration-300 hover:bg-blue-200"
              >
                More info <i class="fas fa-info-circle"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
