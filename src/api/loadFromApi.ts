import { BASE_URL } from '@/constants';
import type { ApiResponse } from '@/types';

export const loadData = async (
  url: string = BASE_URL
): Promise<ApiResponse> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Произошла ошибка при загрузке списка книг ${error}`);
  }
};
