# FitPal Component Tree & Architecture

## 1. Root & Layout Components
* **`App.vue`**
  * **Props:** None
  * **Events:** None
  * **State Ownership:** Global App Layout state. Renders `<RouterView />` and `<Navbar />`.

* **`Navbar.vue`**
  * **Props:** `user` (Object)
  * **Events:** None
  * **State Ownership:** None (stateless display of nav links and user badge).

---

## 2. Screen: Home / Recipe Discovery (`HomeView.vue`)
* **`HomeView.vue`** (Views/Page Component)
  * **State Ownership:** Manages selected ingredient IDs (`myIds`), search query, calorie filter, current page number, and fetched/ranked recipe list.
  * **Child Components:**
    * **`IngredientSearchInput.vue`**
      * **Props:** `availableIngredients` (Array), `selectedIds` (Array)
      * **Events:** `@add-ingredient`, `@remove-ingredient`
    * **`RecipeCard.vue`**
      * **Props:** `recipe` (Object), `matchStats` (Object: matched count, missing ingredients)
      * **Events:** `@view-recipe` (emits recipe ID to trigger router push)
    * **`Pagination.vue`**
      * **Props:** `currentPage` (Number), `totalPages` (Number)
      * **Events:** `@page-change`

---

## 3. Screen: Recipe Detail (`RecipeDetailView.vue`)
* **`RecipeDetailView.vue`** (Views/Page Component)
  * **State Ownership:** Manages current recipe ID from route params, recipe detail data, and meal logging inputs (servings eaten, date).
  * **Child Components:**
    * **`IngredientList.vue`**
      * **Props:** `ingredients` (Array with amounts in grams), `userIngredientIds` (Array)
      * **Events:** None (highlights owned vs missing based on props)
    * **`RecipeSteps.vue`**
      * **Props:** `steps` (Array of Strings)
      * **Events:** None
    * **`MealLogForm.vue`**
      * **Props:** `recipeId` (Number), `defaultServings` (Number)
      * **Events:** `@submit-log` (emits payload to parent view/store to record meal)

---

## 4. Screen: Calorie Tracker & Daily Log (`CalorieTrackerView.vue`)
* **`CalorieTrackerView.vue`** (Views/Page Component)
  * **State Ownership:** Manages selected date, daily meal logs list, and calculated totals (consumed calories vs `dailyCalorieGoal`).
  * **Child Components:**
    * **`CalorieProgressRing.vue`**
      * **Props:** `goal` (Number), `consumed` (Number), `remaining` (Number)
      * **Events:** None
    * **`MacroSummary.vue`**
      * **Props:** `protein` (Number), `carbs` (Number), `fat` (Number)
      * **Events:** None
    * **`MealLogList.vue`**
      * **Props:** `logs` (Array)
      * **Events:** `@edit-log`, `@delete-log`

---

## 5. Screen: Share Community Recipe (`ShareRecipeView.vue`)
* **`ShareRecipeView.vue`** (Views/Page Component)
  * **State Ownership:** Form state (`title`, `servings`, dynamic array of ingredients with amounts, dynamic array of steps).
  * **Child Components:**
    * **`RecipeForm.vue`**
      * **Props:** `initialData` (Object, optional for edits)
      * **Events:** `@save-recipe` (emits complete recipe object to backend/store)