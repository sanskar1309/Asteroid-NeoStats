<template>
  <div class="glass p-6 w-full max-w-sm">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style="background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.2);">
        📅
      </div>
      <h2 class="text-base font-semibold text-white" style="font-family:'Space Grotesk',sans-serif;">
        Select Date Range
      </h2>
    </div>

    <div class="space-y-4">
      <div>
        <label for="start-date"
          class="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          v-model="startDate"
          @change="updateEndDateLimits"
          class="input-dark"
        />
      </div>
      <div>
        <label for="end-date"
          class="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          v-model="endDate"
          :min="startDate"
          :max="maxEndDate"
          class="input-dark"
        />
      </div>
    </div>

    <p class="text-xs text-slate-600 mt-3 mb-5">
      ⚡ Max 7-day range (NASA API limit)
    </p>

    <BaseButton @click="submitDates" class="w-full">
      Search Asteroids
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import { ref, computed } from "vue";

export default {
  components: { BaseButton },
  setup(props, { emit }) {
    const startDate = ref("");
    const endDate   = ref("");

    const maxEndDate = computed(() => {
      if (!startDate.value) return "";
      const start = new Date(startDate.value);
      const maxDate = new Date(start.setDate(start.getDate() + 7));
      return maxDate.toISOString().split("T")[0];
    });

    const updateEndDateLimits = () => {
      if (endDate.value) {
        const end   = new Date(endDate.value);
        const start = new Date(startDate.value);
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
      const start    = new Date(startDate.value);
      const end      = new Date(endDate.value);
      if (end < start) { alert("End date must be after start date."); return; }
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (diffDays > 7) { alert("Date range must be within 7 days."); return; }
      emit("dates-selected", startDate.value, endDate.value);
    };

    return { startDate, endDate, maxEndDate, updateEndDateLimits, submitDates };
  },
};
</script>
