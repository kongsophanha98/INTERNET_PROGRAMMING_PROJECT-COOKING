<template>
  <div class="max-w-4xl mx-auto px-4 py-6 font-sans text-gray-900">
    <!-- Header / Nav Row -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <span class="text-xs uppercase font-bold tracking-wider text-gray-400">Daily Log</span>
        <h1 class="text-2xl font-bold">Calorie Tracker</h1>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-700">JG Jamie G.</span>
      </div>
    </div>

    <!-- Top Dashboard Banner (Calories & Macros) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
      
      <!-- Calorie Progress Ring / Summary -->
      <div class="flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-extrabold tracking-tight">1,380</span>
          <span class="text-sm font-medium text-gray-500">kcal consumed</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2.5 my-3">
          <div class="bg-black h-2.5 rounded-full" style="width: 62%"></div>
        </div>
        <div class="flex justify-between w-full text-xs text-gray-500">
          <span>Goal: 2,200 kcal</span>
          <span class="font-bold text-black">Remaining: 820 kcal</span>
        </div>
      </div>

      <!-- Macro Targets -->
      <div class="md:col-span-2 grid grid-cols-3 gap-4 content-center">
        <!-- Protein -->
        <div class="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p class="text-xs font-semibold text-gray-500 uppercase">Protein</p>
          <p class="text-base font-bold mt-1">62 g <span class="text-xs font-normal text-gray-400">/ 110 g</span></p>
          <p class="text-xs text-gray-500 mt-1">48 g left</p>
        </div>
        <!-- Carbs -->
        <div class="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p class="text-xs font-semibold text-gray-500 uppercase">Carbs</p>
          <p class="text-base font-bold mt-1">148 g <span class="text-xs font-normal text-gray-400">/ 250 g</span></p>
          <p class="text-xs text-gray-500 mt-1">102 g left</p>
        </div>
        <!-- Fat -->
        <div class="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p class="text-xs font-semibold text-gray-500 uppercase">Fat</p>
          <p class="text-base font-bold mt-1">41 g <span class="text-xs font-normal text-gray-400">/ 70 g</span></p>
          <p class="text-xs text-gray-500 mt-1">29 g left</p>
        </div>
      </div>

    </div>

    <!-- Date Navigation & Quick Log Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
        <button class="text-gray-400 hover:text-black font-bold">&lt;</button>
        <span class="text-sm font-semibold">Wed, 11 Nov 2026</span>
        <span class="text-xs bg-black text-white px-2 py-0.5 rounded-full font-medium">Today</span>
        <button class="text-gray-400 hover:text-black font-bold">&gt;</button>
        <span class="text-xs text-gray-400 ml-2 cursor-pointer hover:underline">Jump to date</span>
      </div>

      <button class="bg-black text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-1">
        + Quick Log Meal
      </button>
    </div>

    <!-- Meal Log List -->
    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
      <div class="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
        <span>Meal log</span>
        <span>Total 3 meals</span>
      </div>

      <div class="divide-y divide-gray-100">
        <div v-for="log in mealLogs" :key="log.id" class="p-4 flex items-center justify-between hover:bg-gray-50/50 transition">
          <div class="flex items-start gap-4">
            <span class="text-xs font-semibold text-gray-400 w-16 pt-0.5">{{ log.time }}</span>
            <div>
              <p class="text-sm font-bold">{{ log.recipeTitle }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ log.servingsEaten }} serving(s)</p>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <span class="text-sm font-bold">{{ log.calories }} kcal</span>
            <div class="flex gap-2 text-xs font-medium">
              <button class="text-gray-600 hover:text-black border border-gray-200 px-2.5 py-1 rounded-lg">Edit</button>
              <button class="text-red-600 hover:text-red-700 border border-red-100 bg-red-50/50 px-2.5 py-1 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mealLogs = ref([
  { id: 101, time: '8:15 AM', recipeTitle: 'Spinach fried rice', servingsEaten: 1, calories: 340 },
  { id: 102, time: '12:40 PM', recipeTitle: 'Lemon chicken & rice', servingsEaten: 1.5, calories: 720 },
  { id: 103, time: '3:30 PM', recipeTitle: 'Chicken & spinach salad', servingsEaten: 1, calories: 320 }
]);
</script>