import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Book, CopyBook } from '@/types';
import { loadData } from '@/api';

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[] | null>(null);
  const copyBooks = ref<CopyBook[]>([]);
  const booksIsLoading = ref<boolean>(true);
  const prevPageLink = ref<string | null>(null);
  const nextPageLink = ref<string | null>(null);

  async function getBooks(url: string = '') {
    booksIsLoading.value = true;
    const data = url ? await loadData(url) : await loadData();
    books.value = data?.results;
    copyBooks.value = books.value.map((book) =>
      Object.assign(
        {
          list: '',
          bookIsPlan: false,
          bookIsReading: false,
          bookIsDone: false,
        },
        book
      )
    );

    prevPageLink.value = data.previous;
    nextPageLink.value = data.next;
    booksIsLoading.value = false;
  }

  return {
    books,
    copyBooks,
    booksIsLoading,
    prevPageLink,
    nextPageLink,
    getBooks,
  };
});
