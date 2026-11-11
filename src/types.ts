export interface Ingredient {
  id: number;
  name: string;
  caloriesPer100g: number;
}

export interface RecipeIngredient {
  ingredientId: number;
  ingredient?: Ingredient; // populated entity
  amountInGrams: number;
}

export interface Recipe {
  id: number;
  title: string;
  prepTimeMinutes: number;
  servings: number;
  isOfficial: boolean;
  authorId: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  likesCount?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
  dailyCalorieGoal: number;
  proteinGoalGrams?: number;
  carbsGoalGrams?: number;
  fatGoalGrams?: number;
}

export interface MealLog {
  id: number;
  userId: number;
  recipeId: number;
  recipeTitle: string;
  servingsEaten: number;
  calories: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
}

// Helper interface for ingredient-matching query results (Story 1 & 2)
export interface RecipeMatchResult {
  recipe: Recipe;
  matchedCount: number;
  totalCount: number;
  missingIngredients: Ingredient[];
}