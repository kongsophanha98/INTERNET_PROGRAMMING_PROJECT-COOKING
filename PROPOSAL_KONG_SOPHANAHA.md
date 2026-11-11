# FitPal

## Problem
People who eat with discipline and track their intake must switch between a recipe site and a calorie app, and they often do not know what to cook with the ingredients they already have. This makes it hard to stay on their calorie goal and easy to waste food.

## Users and roles
Everyone can use the app. The target audience is health-disciplined people who want to track what they eat.
- Member: enters the ingredients they have, gets recipe suggestions, shares their own recipes, logs meals and tracks daily calories
- Admin: posts official recipes, manages the ingredient list (calories per 100 g) and removes inappropriate recipes

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
7. As a member, I want to comment on a recipe and delete my own comments so that I can share tips with others. An admin can also remove inappropriate comments.
8. As an admin, I want to manage the ingredient list and its calories so that calorie data stays correct.
9. As an admin, I want to post official recipes and remove inappropriate recipes so that the community stays clean.
10. As a member, I want to like a recipe so that I can show which ones I enjoy.

## MVP scope
Must have (7): story 1, 2, 3, 4, 5, 8, 9
Nice to have: story 6, 7, 10, and tracking protein, carbs and fat

### Which stories did I cut from the must-haves, and why?
- Story 7 (comments): it is a social feature. The main idea of the app (ingredients, then a recipe, then logging calories) works without it. Dropping it also removes the Comment entity from the core model. This was the lecturer's suggestion and I agree.
- Story 6 (edit or delete my own recipes): story 5 already lets members share a recipe, and an admin can remove a bad one (story 9). Editing and deleting is useful, but it is polish on top of a feature that already works, so it comes right after the MVP.
- Story 10 (likes) stays nice-to-have as before.

## Entities
Core entities, built in this order: Ingredient, Recipe, RecipeIngredient, then User and MealLog.

| Entity | Main attributes | Relations |
|---|---|---|
| Ingredient | name, caloriesPer100g | has many RecipeIngredients |
| Recipe | title, steps, servings, isOfficial | belongs to User (author); has many RecipeIngredients and MealLogs |
| RecipeIngredient | amountInGrams | belongs to Recipe and Ingredient (many-to-many link) |
| User | name, email, passwordHash, role, dailyCalorieGoal | has many Recipes; has many MealLogs |
| MealLog | date, servings | belongs to User and Recipe |

Added only if story 7 is built:

| Entity | Main attributes | Relations |
|---|---|---|
| Comment | text, createdAt | belongs to User and Recipe |

## Ranking recipes by my ingredients (story 1)
This is the hardest query in the app, so here is the plan before I build it.

Input: the ids of the ingredients the member entered (`myIds`).

For each recipe, count how many of its ingredients are in `myIds` (matched) and how many it has in total. Then:
- keep only recipes with matched > 0 (if none, show the "nothing matches" message)
- sort by matched, highest first
- break ties by fewest missing ingredients (total - matched)
- the missing ingredients of a recipe are its ingredients that are not in `myIds`

Draft query (PostgreSQL syntax):

```sql
SELECT r.id,
       r.title,
       COUNT(*) FILTER (WHERE ri.ingredient_id = ANY(:myIds)) AS matched,
       COUNT(*)                                               AS total
FROM recipe r
JOIN recipe_ingredient ri ON ri.recipe_id = r.id
GROUP BY r.id, r.title
HAVING COUNT(*) FILTER (WHERE ri.ingredient_id = ANY(:myIds)) > 0
ORDER BY matched DESC, (COUNT(*) - COUNT(*) FILTER (WHERE ri.ingredient_id = ANY(:myIds))) ASC;
```

The "missing" list comes from a second query on the returned recipe ids: their RecipeIngredients where the ingredient id is not in `myIds`.

To test it, I will create a small set of seed recipes and check that the order is correct for 3 or 4 different ingredient lists.

## Stretch feature
One of: search + pagination, file upload, real-time, scheduled task.
Chosen: search, filter and pagination.
What it does in this app: members search recipes by name, filter them by maximum calories, and browse results 10 per page.

## Repository
https://github.com/kongsophanha98/INTERNET_PROGRAMMING_PROJECT-COOKING/tree/PROJECT_COOKING