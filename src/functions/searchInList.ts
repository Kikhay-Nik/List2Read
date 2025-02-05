import type { CopyBook } from '@/types';

export const searchInList = (searchValue: string, targetArray: CopyBook[]) => {
  return targetArray.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase())
  );
};
