import type { CopyBook } from '@/types';

export function findBook(targetArray: CopyBook[], sourceArray: CopyBook[]) {
  const resultArray = <CopyBook[]>[...targetArray];

  for (let j = 0; j < sourceArray.length; j++) {
    const book = sourceArray[j];

    for (let i = 0; i < resultArray.length; i++) {
      const element = resultArray[i];
      if (element.id === book.id) {
        Object.assign(element, book);
      }
    }
  }
  return resultArray;
}
