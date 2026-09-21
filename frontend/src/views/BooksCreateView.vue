<script setup lang="ts">
import { ref } from 'vue';

import type { CreateBookDTO } from '@/dtos/CreateBookDTO';
import { BookService } from '@/services/BookService';

const title = ref('');
const category = ref('');
const price = ref(0);
const stock = ref(0);
const successMessage = ref('');

async function submitForm() {
  const newBook: CreateBookDTO = {
    title: title.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
  };

  try {
    await BookService.createBook(newBook);

    successMessage.value = 'Book created successfully!';

    title.value = '';
    category.value = '';
    price.value = 0;
    stock.value = 0;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section>
    <div class="mx-auto max-w-3xl">
      <div class="rounded-lg bg-white p-8 shadow-md">
        <h2 class="mb-6 text-2xl font-bold text-gray-800">
          Create Book
        </h2>

        <div
          v-if="successMessage"
          class="mb-6 rounded-lg bg-green-100 px-4 py-3 text-green-800"
        >
          {{ successMessage }}
        </div>

        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label class="mb-2 block font-medium text-gray-700" for="title">
              Title
            </label>

            <input
              id="title"
              v-model="title"
              type="text"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block font-medium text-gray-700" for="category">
              Category
            </label>

            <input
              id="category"
              v-model="category"
              type="text"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block font-medium text-gray-700" for="price">
              Price
            </label>

            <input
              id="price"
              v-model.number="price"
              type="number"
              min="0"
              step="0.01"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block font-medium text-gray-700" for="stock">
              Stock
            </label>

            <input
              id="stock"
              v-model.number="stock"
              type="number"
              min="0"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            class="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            Create Book
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
