<script setup lang="ts">
import { computed, ref } from 'vue';

import { ReviewService } from '@/services/ReviewService';

const props = defineProps<{
  bookId: number;
}>();

const bookReviews = computed(() => ReviewService.getReviewsByBookId(props.bookId));

const reviewForm = ref({
  rating: 5,
  comment: '',
  author: '',
});

const isSubmitting = ref(false);

function submitReview(): void {
  if (!reviewForm.value.comment.trim()) return;

  isSubmitting.value = true;

  ReviewService.createReview({
    bookId: props.bookId,
    rating: Math.min(5, Math.max(1, reviewForm.value.rating)),
    comment: reviewForm.value.comment.trim(),
    author: reviewForm.value.author.trim() || undefined,
  });

  reviewForm.value = {
    rating: 5,
    comment: '',
    author: '',
  };

  isSubmitting.value = false;
}

function formatReviewDate(iso?: string): string {
  if (!iso) return '';

  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold text-gray-800">Reviews</h3>

    <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h4 class="mb-3 text-sm font-medium text-gray-700">Add a review</h4>

      <form class="space-y-3" @submit.prevent="submitReview">
        <div>
          <label for="rating" class="mb-1 block text-sm text-gray-600"> Rating </label>

          <select
            id="rating"
            v-model.number="reviewForm.rating"
            class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            required
          >
            <option v-for="n in 5" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>

        <div>
          <label for="comment" class="mb-1 block text-sm text-gray-600"> Comment </label>

          <textarea
            id="comment"
            v-model="reviewForm.comment"
            rows="3"
            class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="Write your review..."
            required
          />
        </div>

        <div>
          <label for="author" class="mb-1 block text-sm text-gray-600">
            Your name (optional)
          </label>

          <input
            id="author"
            v-model="reviewForm.author"
            type="text"
            class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="Name"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting || !reviewForm.comment.trim()"
          class="rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Post review
        </button>
      </form>
    </div>

    <ul class="space-y-4">
      <li
        v-for="review in bookReviews"
        :key="review.id"
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div class="mb-2 flex items-center justify-between gap-2">
          <span class="font-medium text-gray-800">
            {{ review.author || 'Anonymous' }}
          </span>

          <span class="text-sm text-amber-500" :title="`${review.rating} stars`">
            {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}
          </span>
        </div>

        <p class="whitespace-pre-wrap text-sm text-gray-600">
          {{ review.comment }}
        </p>

        <p v-if="review.createdAt" class="mt-2 text-xs text-gray-400">
          {{ formatReviewDate(review.createdAt) }}
        </p>
      </li>

      <li v-if="bookReviews.length === 0" class="py-4 text-sm text-gray-500">
        No reviews yet. Be the first to review!
      </li>
    </ul>
  </div>
</template>
