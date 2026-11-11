import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Recipe } from '../types';
import { recipesApi } from '../api/recipesApi';

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([]);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const error = ref<string | null>(null);

  const byId = computed(() => {
    return (id: number) => recipes.value.find((r) => r.id === id);
  });

  async function fetchAll() {
    status.value = 'loading';
    error.value = null;
    try {
      recipes.value = await recipesApi.list();
      status.value = 'success';
    } catch (err: any) {
      error.value = err.message || 'Failed to load recipes';
      status.value = 'error';
    }
  }

  return { recipes, status, error, byId, fetchAll };
});