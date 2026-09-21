<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import BookReviews from '@/components/BookReviews.vue';
import type { BookInterface } from '@/interfaces/BookInterface';
import { BookService } from '@/services/BookService';
import { formatToCOP } from '@/utils/formatters';

const route = useRoute();
const book = ref<BookInterface | null>(null);

onMounted(async () => {
  const bookId = Number(route.params.id);
  book.value = await BookService.getBookById(bookId);
});
</script>

<template>
  <section v-if="book">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 gap-12">
        <div class="lg:col-span-2">
          <div class="mb-8 rounded-lg bg-white p-8 shadow-md">
            <div class="flex items-start space-x-8">
              <div>
                <img
                  src="https://picsum.photos/seed/picsum/536/354"
                  alt="Book Cover"
                  class="h-auto w-72 rounded object-cover shadow-sm"
                />
              </div>

              <div>
                <h2 class="mb-6 text-2xl font-bold text-gray-800">
                  {{ book.title }}
                </h2>

                <div class="prose text-gray-600">
                  <p class="mb-4">
                    "{{ book.title }}" is an outstanding work in the
                    {{ book.category }} category.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div class="rounded-lg bg-white p-6 shadow-md">
              <h3 class="mb-4 text-lg font-semibold text-gray-800">
                Book Information
              </h3>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Title:</span>
                  <span class="font-medium">
                    {{ book.title }}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600">Category:</span>
                  <span class="font-medium">
                    {{ book.category }}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600">Price:</span>
                  <span class="font-medium">
                    ${{ formatToCOP(book.price) }} COP
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600">Stock:</span>
                  <span class="font-medium">
                    {{ book.stock }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 rounded-lg bg-white p-6 shadow-md">
            <BookReviews :book-id="book.id" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
