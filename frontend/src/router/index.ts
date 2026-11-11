import { createRouter, createWebHistory } from 'vue-router';
import AddRecipeView from '../views/AddRecipeView.vue';

const routes = [
  {
    path: '/',
    name: 'AddRecipe',
    component: AddRecipeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;