import type { Book } from './book';

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}
