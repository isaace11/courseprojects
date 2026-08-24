import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore';

export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewsByBookId(bookId: number): ReviewInterface[] {
    const reviewStore = useReviewStore();

    return reviewStore.reviews.filter((review) => review.bookId === bookId);
  }

  static createReview(review: Omit<ReviewInterface, 'id'>): void {
    const reviewStore = useReviewStore();

    const nextId =
      reviewStore.reviews.length > 0
        ? Math.max(...reviewStore.reviews.map((storedReview) => storedReview.id), 0) + 1
        : 1;

    reviewStore.reviews.push({
      id: nextId,
      ...review,
      createdAt: new Date().toISOString(),
    });
  }
}
