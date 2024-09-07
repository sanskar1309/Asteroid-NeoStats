<template>
  <div class="mt-4 flex justify-center items-center">
    <div class="p-6 border rounded-lg shadow-md bg-white">
      <h2 class="text-xl font-bold mb-2 text-center">Asteroid Statistics</h2>
      <p class="">
        <strong>Fastest Asteroid:</strong> {{ stats.fastest.id || "N/A" }} at
        {{ stats.fastest.speed || "N/A" }} km/h
      </p>
      <p>
        <strong>Closest Asteroid:</strong> {{ stats.closest.id || "N/A" }} at
        {{ stats.closest.distance || "N/A" }} km
      </p>
      <p><strong>Average Size:</strong> {{ stats.averageSize || "N/A" }} km</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
};
</script>


