import type { CopyBook } from '@/types';
import { defineStore } from 'pinia';

export const useListsStore = defineStore('booksLists', {
  state: () => {
    return {
      planList: <CopyBook[]>[],
      readingList: <CopyBook[]>[],
      doneList: <CopyBook[]>[],
    };
  },
  actions: {
    addBookToPlanList(book: CopyBook) {
      this.planList.push(book);
    },
    addBookToReadingList(book: CopyBook) {
      this.readingList.push(book);
    },
    addBookToDoneList(book: CopyBook) {
      this.doneList.push(book);
    },
    removeFromPlanList(book: CopyBook) {
      this.planList = this.planList.filter(
        (listitem) => listitem.id !== book.id
      );
    },
    removeFromReadingList(book: CopyBook) {
      this.readingList = this.readingList.filter(
        (listitem) => listitem.id !== book.id
      );
    },
    removeFromDoneList(book: CopyBook) {
      this.doneList = this.doneList.filter(
        (listitem) => listitem.id !== book.id
      );
    },
  },
  getters: {
    planListLength(): number {
      return this.planList.length;
    },
    readingListLength(): number {
      return this.readingList.length;
    },
    doneListLength(): number {
      return this.doneList.length;
    },
    planListIsEmpty(): boolean {
      return this.planListLength === 0;
    },
    readingListIsEmpty(): boolean {
      return this.readingListLength === 0;
    },
    doneListIsEmpty(): boolean {
      return this.doneListLength === 0;
    },
  },
});
