import type { Person } from './person';

export interface Book {
  id: number;
  title: string;
  subjects: string[];
  authors: Person[];
  translators: Person[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: {
    'image/jpeg': string;
  };
  download_count: number;
}

export interface CopyBook extends Book {
  list: string;
  bookIsPlan: boolean;
  bookIsReading: boolean;
  bookIsDone: boolean;
}
