<template>
  <div class="max-w-4xl mx-auto px-4 py-6 font-sans text-gray-900">
    <!-- Top Nav / Back Link -->
    <div class="flex items-center justify-between mb-4">
      <router-link to="/" class="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1">
        &lt; Back
      </router-link>
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-700">JG Jamie G. v</span>
      </div>
    </div>

    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-6">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold">Lemon chicken & rice</h1>
          <span v-if="recipe.isOfficial" class="text-xs bg-black text-white px-2.5 py-1 rounded-full font-medium">Official Recipe</span>
        </div>
      </div>
      <button class="mt-3 md:mt-0 flex items-center gap-1 text-sm font-medium border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 self-start">
        ♥ Like {{ recipe.likesCount }}
      </button>
    </div>

    <!-- Overview Bar -->
    <div class="grid grid-cols-3 bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 text-center">
      <div>
        <p class="text-xs text-gray-500 uppercase tracking-wider">Prep time</p>
        <p class="text-lg font-bold mt-0.5">{{ recipe.prepTimeMinutes }} min</p>
      </div>
      <div class="border-x border-gray-200">
        <p class="text-xs text-gray-500 uppercase tracking-wider">Calories / Serving</p>
        <p class="text-lg font-bold mt-0.5">480 kcal</p>
      </div>
      <div>
        <p class="text-xs text-gray-500 uppercase tracking-wider">Servings</p>
        <p class="text-lg font-bold mt-0.5">{{ recipe.servings }} servings</p>
      </div>
    </div>

    <!-- Main 2-Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Ingredients Column -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-bold">Ingredients</h2>
          <div class="flex gap-2 text-xs font-semibold">
            <span class="px-2 py-0.5 bg-black text-white rounded">Owned</span>
            <span class="px-2 py-0.5 bg-gray-200 text-gray-700 rounded">Missing</span>
          </div>
        </div>
        <p class="text-xs text-gray-500 mb-4">3 of 4 ingredients owned • Amounts are for the whole recipe (2 servings)</p>

        <div class="space-y-3">
          <div v-for="(item, index) in ingredientsList" :key="index" 
               class="border border-gray-200 rounded-xl p-3 flex items-center justify-between bg-white shadow-sm"
               :class="{ 'border-dashed bg-gray-50/50': !item.owned }">
            <div>
              <p class="font-semibold text-sm">{{ item.name }}</p>
              <p class="text-xs text-gray-500">{{ item.caloriesPer100g }} kcal/100 g</p>
            </div>
            <div class="text-right flex items-center gap-3">
              <div>
                <p class="text-sm font-medium">{{ item.amount }} g</p>
                <p class="text-xs text-gray-500">{{ item.totalCalories }} kcal</p>
              </div>
              <span class="text-xs font-semibold px-2 py-1 rounded-full"
                    :class="item.owned ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'">
                {{ item.owned ? 'Owned' : 'Missing' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions Column -->
      <div>
        <h2 class="text-lg font-bold mb-4">Instructions</h2>
        <div class="space-y-4">
          <div v-for="(step, idx) in recipe.steps" :key="idx" class="flex gap-3 text-sm">
            <span class="font-bold text-gray-400 w-5 shrink-0">{{ idx + 1 }}</span>
            <p class="text-gray-700 leading-relaxed">{{ step }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Footer Card: Log This Meal -->
    <div class="border border-gray-200 bg-gray-50 rounded-2xl p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 class="font-bold text-base">Log this meal</h3>
          <p class="text-xs text-gray-500">1 serving • 480 kcal</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Servings eaten</label>
          <input type="number" v-model.number="servingsEaten" min="0.5" step="0.5" class="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-black focus:outline-none" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Date</label>
          <input type="date" v-model="logDate" class="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-black focus:outline-none" />
        </div>
      </div>

      <button @click="handleLogMeal" class="w-full bg-black text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition text-sm">
        Log Meal to Daily Tracker
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock recipe state based on wireframes
const recipe = ref({
  id: 1,
  title: 'Lemon chicken & rice',
  isOfficial: true,
  prepTimeMinutes: 25,
  servings: 2,
  likesCount: 128,
  steps: [
    'Season the chicken with salt, pepper and minced garlic. Let it rest for 5 minutes.',
    'Sear the chicken in a hot pan for 6-7 minutes per side until golden, then set aside.',
    'In the same pan, add the cooked rice and a splash of water. Stir for 2 minutes.',
    'Squeeze in the lemon juice, return the chicken to the pan and cover for 5 minutes.',
    'Slice the chicken, plate over the rice and finish with lemon zest.'
  ]
});

const ingredientsList = ref([
  { name: 'Chicken breast', caloriesPer100g: 165, amount: 400, totalCalories: 660, owned: true },
  { name: 'Rice, cooked', caloriesPer100g: 130, amount: 200, totalCalories: 260, owned: true },
  { name: 'Garlic', caloriesPer100g: 149, amount: 10, totalCalories: 15, owned: true },
  { name: 'Lemon', caloriesPer100g: 29, amount: 100, totalCalories: 29, owned: false }
]);

const servingsEaten = ref(1);
const logDate = ref('2026-11-11');

const handleLogMeal = () => {
  alert(`Successfully logged ${servingsEaten.value} serving(s) for ${logDate.value}!`);
};
</script>