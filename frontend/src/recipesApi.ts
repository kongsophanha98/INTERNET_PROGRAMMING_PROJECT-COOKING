import { http } from './http';
import type { Recipe } from './types';

export const recipesApi = {
  list: () => http<Recipe[]>('/recipes'),
  get: (id: number) => http<Recipe>(`/recipes/${id}`),
  create: (recipe: Omit<Recipe, 'id'>) => http<Recipe>('/recipes', {
    method: 'POST',
    body: JSON.stringify(recipe),
  }),
};