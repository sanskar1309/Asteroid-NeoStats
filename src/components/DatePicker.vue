<template>
  <div class="container flex flex-col items-center">
    <div
      class="flex flex-col items-center gap-3 py-8 border rounded-lg shadow-md bg-white w-96 p-6 "
    >
      <div class="w-full">
        <label for="start-date" class="block text-gray-700 font-medium mb-1"
          >Start Date</label
        >
        <input
          id="start-date"
          type="date"
          v-model="startDate"
          class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Start Date"
          @change="updateEndDateLimits"
        />
      </div>

      <div class="w-full">
        <label for="end-date" class="block text-gray-700 font-medium mb-1"
          >End Date</label
        >
        <input
          id="end-date"
          type="date"
          v-model="endDate"
          class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="End Date"
          :min="startDate"
          :max="maxEndDate"
        />
      </div>

      <BaseButton @click="submitDates" class="w-full"> Submit </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import { ref, computed } from "vue";

export default {
  components: {
    BaseButton,
  },
  setup(props, { emit }) {
    const startDate = ref("");
    const endDate = ref("");

    // End date can be at most 7 days after the start date
    const maxEndDate = computed(() => {
      if (!startDate.value) return "";
      const start = new Date(startDate.value);
      const maxDate = new Date(start.setDate(start.getDate() + 7)); // Adds 7 days to the start date
      return maxDate.toISOString().split("T")[0];
    });

    // Method to ensure the selected end date is within the allowed range (7 days from start)
    const updateEndDateLimits = () => {
      if (endDate.value) {
        const end = new Date(endDate.value);
        const start = new Date(startDate.value);
        // If end date exceeds the 7-day limit, reset the end date
        if (end > new Date(start.setDate(start.getDate() + 7))) {
          endDate.value = "";
        }
      }
    };

    const submitDates = () => {
      if (!startDate.value || !endDate.value) {
        alert("Please select both start and end dates.");
        return;
      }

      const start = new Date(startDate.value);
      const end = new Date(endDate.value);

      if (end < start) {
        alert("End date must be after start date.");
        return;
      }

      // Ensure the date range is within the 7-day limit
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (diffDays > 7) {
        alert("Date range must be within 7 days.");
        return;
      }

      // Emit the selected dates to the parent component
      emit("dates-selected", startDate.value, endDate.value);
    };

    return {
      startDate,
      endDate,
      maxEndDate,
      updateEndDateLimits,
      submitDates,
    };
  },
};
</script>

