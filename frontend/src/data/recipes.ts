import type { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Lemon chicken & rice',
    prepTimeMinutes: 25,
    servings: 2,
    isOfficial: true,
    authorId: 1,
    likesCount: 128,
    ingredients: [
      { ingredientId: 1, amountInGrams: 400 }, // 660 kcal
      { ingredientId: 2, amountInGrams: 200 }, // 260 kcal
      { ingredientId: 3, amountInGrams: 10 },  // 15 kcal
      { ingredientId: 4, amountInGrams: 100 }  // 29 kcal
    ],
    steps: [
      'Season the chicken with salt, pepper and minced garlic. Let it rest for 5 minutes.',
      'Sear the chicken in a hot pan for 6-7 minutes per side until golden, then set aside.',
      'In the same pan, add the cooked rice and a splash of water. Stir for 2 minutes.',
      'Squeeze in the lemon juice, return the chicken to the pan and cover for 5 minutes.',
      'Slice the chicken, plate over the rice and finish with lemon zest.'
    ]
  },
  {
    id: 2,
    title: 'Spinach fried rice',
    prepTimeMinutes: 15,
    servings: 1,
    isOfficial: true,
    authorId: 1,
    likesCount: 84,
    ingredients: [
      { ingredientId: 2, amountInGrams: 200 },
      { ingredientId: 5, amountInGrams: 100 },
      { ingredientId: 3, amountInGrams: 5 }
    ],
    steps: [
      'Heat oil in a pan and saute garlic until fragrant.',
      'Add fresh spinach and cook until wilted.',
      'Toss in cooked rice and stir-fry evenly with soy sauce.'
    ]
  }
];