<script setup lang="ts">
import { reactive, ref } from 'vue';
import { recipesApi } from '../api/recipesApi';

const form = reactive({
  title: '',
  prepTimeMinutes: '',
  servings: '',
  steps: '',
});

const errors = reactive({
  title: '',
  prepTimeMinutes: '',
  servings: '',
  steps: '',
  submit: '',
});

const submitting = ref(false);
const success = ref('');

function validate() {
  const title = form.title.trim();
  const prepTimeMinutes = Number(form.prepTimeMinutes);
  const servings = Number(form.servings);
  const steps = form.steps
    .split(/\n+/)
    .map((step) => step.trim())
    .filter(Boolean);

  errors.title = title.length >= 3 ? '' : 'Title must be at least 3 characters long.';
  errors.prepTimeMinutes = Number.isFinite(prepTimeMinutes) && prepTimeMinutes > 0 ? '' : 'Prep time must be greater than 0.';
  errors.servings = Number.isFinite(servings) && servings >= 1 ? '' : 'Servings must be at least 1.';
  errors.steps = steps.length > 0 ? '' : 'Please add at least one cooking step.';

  return !errors.title && !errors.prepTimeMinutes && !errors.servings && !errors.steps;
}

async function submitRecipe() {
  if (!validate()) {
    success.value = '';
    return;
  }

  submitting.value = true;
  errors.submit = '';

  try {
    const payload = {
      title: form.title.trim(),
      prepTimeMinutes: Number(form.prepTimeMinutes),
      servings: Number(form.servings),
      isOfficial: false,
      authorId: 1,
      ingredients: [],
      steps: form.steps
        .split(/\n+/)
        .map((step) => step.trim())
        .filter(Boolean),
      likesCount: 0,
    };

    await recipesApi.create(payload);
    success.value = 'Recipe added successfully.';
    form.title = '';
    form.prepTimeMinutes = '';
    form.servings = '';
    form.steps = '';
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to save recipe.';
    errors.submit = message;
    success.value = '';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <main class="page-shell">
    <section class="card">
      <div class="heading">
        <p class="eyebrow">FitPal</p>
        <h1>Add a recipe</h1>
      </div>

      <form class="recipe-form" @submit.prevent="submitRecipe">
        <label>
          <span>Title</span>
          <input v-model="form.title" type="text" placeholder="Lemon chicken rice" />
          <small v-if="errors.title">{{ errors.title }}</small>
        </label>

        <div class="two-column">
          <label>
            <span>Prep time (minutes)</span>
            <input v-model="form.prepTimeMinutes" type="number" min="1" />
            <small v-if="errors.prepTimeMinutes">{{ errors.prepTimeMinutes }}</small>
          </label>

          <label>
            <span>Servings</span>
            <input v-model="form.servings" type="number" min="1" />
            <small v-if="errors.servings">{{ errors.servings }}</small>
          </label>
        </div>

        <label>
          <span>Steps</span>
          <textarea v-model="form.steps" rows="6" placeholder="One step per line" />
          <small v-if="errors.steps">{{ errors.steps }}</small>
        </label>

        <div class="actions">
          <button type="submit" :disabled="submitting">
            {{ submitting ? 'Saving...' : 'Save recipe' }}
          </button>
        </div>

        <p v-if="success" class="success">{{ success }}</p>
        <p v-if="errors.submit" class="error">{{ errors.submit }}</p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
  padding: 24px;
}

.card {
  width: min(680px, 100%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid #dbeafe;
  border-radius: 18px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
  padding: 28px;
}

.heading {
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #15803d;
  text-transform: uppercase;
}

h1 {
  margin: 8px 0 0;
  font-size: 2rem;
}

.recipe-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
  color: #334155;
}

input,
textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 12px 14px;
  font: inherit;
  background: white;
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(22, 163, 74, 0.2);
  border-color: #22c55e;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

small {
  color: #dc2626;
  font-weight: 500;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

button {
  border: none;
  border-radius: 10px;
  background: #16a34a;
  color: white;
  padding: 12px 22px;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: progress;
}

.success {
  margin: 0;
  color: #166534;
  font-weight: 600;
}

.error {
  margin: 0;
  color: #b91c1c;
  font-weight: 600;
}

@media (max-width: 640px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}
</style>
