<template>
  <div class="mt-4 flex justify-center items-center">
    <div class="p-6 border rounded-lg shadow-md bg-white">
      <h2 class="text-xl font-bold mb-2 text-center text-gray-800">Asteroid Statistics</h2>
      <p>
        <strong class="text-gray-700 mr-1">Fastest Asteroid:</strong> 
        <span class="text-gray-600">{{ stats.fastest.id || "N/A" }}</span> at
        <span class="text-gray-600">{{ stats.fastest.speed || "N/A" }} km/h</span>
      </p>
      <p>
        <strong class="text-gray-700 mr-1">Closest Asteroid:</strong> 
        <span class="text-gray-600">{{ stats.closest.id || "N/A" }}</span> at
        <span class="text-gray-600">{{ stats.closest.distance || "N/A" }} km</span>
      </p>
      <p>
        <strong class="text-gray-700 mr-1">Average Size:</strong> 
        <span class="text-gray-600">{{ stats.averageSize || "N/A" }} km</span>
      </p>
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

<style scoped>

.text-gray-800 {
  color: #333;
}

.text-gray-700 {
  color: #555; 
}

.text-gray-600 {
  color: #777; 
}
</style>
