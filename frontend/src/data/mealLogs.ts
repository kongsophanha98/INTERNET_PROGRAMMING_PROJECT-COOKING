import type { MealLog, User } from '../types';

export const mockUser: User = {
  id: 1,
  name: 'Jamie G.',
  email: 'jamie@fitpal.app',
  role: 'MEMBER',
  dailyCalorieGoal: 2200,
  proteinGoalGrams: 110,
  carbsGoalGrams: 250,
  fatGoalGrams: 70
};

export const mockMealLogs: MealLog[] = [
  {
    id: 101,
    userId: 1,
    recipeId: 2,
    recipeTitle: 'Spinach fried rice',
    servingsEaten: 1,
    calories: 340,
    date: '2026-11-11',
    time: '8:15 AM'
  },
  {
    id: 102,
    userId: 1,
    recipeId: 1,
    recipeTitle: 'Lemon chicken & rice',
    servingsEaten: 1.5,
    calories: 720,
    date: '2026-11-11',
    time: '12:40 PM'
  },
  {
    id: 103,
    userId: 1,
    recipeId: 3,
    recipeTitle: 'Chicken & spinach salad',
    servingsEaten: 1,
    calories: 320,
    date: '2026-11-11',
    time: '3:30 PM'
  }
];