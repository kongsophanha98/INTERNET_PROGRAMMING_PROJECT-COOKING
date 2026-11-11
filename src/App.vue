<script setup lang="ts">
import { computed, ref, watch } from "vue";
import EventList from "./components/EventList.vue";
import { initialEvents } from "./data/events";

const STORAGE_KEY = "campus-events-bookings";
const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as number[];
const booked = ref<number[]>(saved);

watch(
  booked,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  },
  { deep: true }
);

const events = computed(() =>
  initialEvents.map((event) => {
    const addedBookings = booked.value.filter((id) => id === event.id).length;
    return { ...event, booked: event.booked + addedBookings };
  })
);

const bookedCount = computed(() => booked.value.length);

function handleBook(id: number) {
  const event = initialEvents.find((item) => item.id === id);
  if (!event || booked.value.includes(id)) return;

  const currentTotal = event.booked + booked.value.filter((entry) => entry === id).length;
  if (currentTotal >= event.capacity) return;

  booked.value = [...booked.value, id];
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <h1>Campus Events</h1>
      <p>You have booked {{ bookedCount }} {{ bookedCount === 1 ? "seat" : "seats" }}.</p>
    </header>

    <EventList :events="events" @book="handleBook" />
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 12px;
  margin-bottom: 24px;
}
h1 {
  margin: 0;
  color: #111827;
}
.topbar p {
  margin: 0;
  color: #374151;
  font-weight: 600;
}
</style>
