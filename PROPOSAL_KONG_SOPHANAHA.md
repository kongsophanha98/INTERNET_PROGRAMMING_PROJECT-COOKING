# FridgeChef (Unofficial name)

## Problem
People who eat with discipline and track their intake must switch between a recipe site and a calorie app, and they often do not know what to cook with the ingredients they already have. This makes it hard to stay on their calorie goal and easy to waste food.

## Users and roles
Everyone can use the app. The target audience is health-disciplined people who want to track what they eat.
- Member: enters the ingredients they have, gets recipe suggestions, shares their own recipes, comments on recipes, logs meals and tracks daily calories
- Admin: posts official recipes, manages the ingredient list (calories per 100 g) and removes inappropriate recipes or comments

## User stories
1. As a member, I want to enter the ingredients I have so that the app suggests recipes I can cook.
   Accepted when: I can add several ingredients; recipes are ranked by how many of my ingredients they use; each result shows which ingredients I am missing; a clear message appears when nothing matches
2. As a member, I want to see a recipe's ingredients, steps and calories per serving so that I can decide what to cook.
3. As a member, I want to log a meal I ate so that I can track my daily calories against my goal.
   Accepted when: a log has a recipe, servings and date; my daily total updates after logging; I can only edit or delete my own logs; the app shows how many calories I have left today
4. As a member, I want to set a daily calorie goal so that I can compare it with what I ate.
5. As a member, I want to share my own recipe so that others can cook it and it appears on my profile.
   Accepted when: the recipe needs a title, steps and at least one ingredient with an amount; invalid input gets a clear error message; the recipe appears on my profile page and is marked as a community recipe
6. As a member, I want to edit or delete my own recipes so that I can fix mistakes.
7. As a member, I want to comment on a recipe and delete my own comments so that I can share tips with others.
8. As an admin, I want to manage the ingredient list and its calories so that calorie data stays correct.
9. As an admin, I want to post official recipes and remove inappropriate recipes or comments so that the community stays clean.
10. As a member, I want to like a recipe so that I can show which ones I enjoy.

## MVP scope
Must have: story 1, 2, 3, 4, 5, 6, 7, 8, 9
Nice to have: story 10, and tracking protein, carbs and fat

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| User | name, email, passwordHash, role, dailyCalorieGoal | has many Recipes; has many MealLogs; has many Comments |
| Ingredient | name, caloriesPer100g | has many RecipeIngredients |
| Recipe | title, steps, servings, isOfficial | belongs to User (author); has many RecipeIngredients, MealLogs and Comments |
| RecipeIngredient | amountInGrams | belongs to Recipe and Ingredient (many-to-many link) |
| MealLog | date, servings | belongs to User and Recipe |
| Comment | text, createdAt | belongs to User and Recipe |

## Stretch feature
One of: search + pagination, file upload, real-time, scheduled task.
Chosen: search, filter and pagination.
What it does in this app: members search recipes by name, filter them by maximum calories, and browse results 10 per page.

## Repository
https://github.com/kongsophanha98/INTERNET_PROGRAMMING-/tree/PROJECT_COOKING
