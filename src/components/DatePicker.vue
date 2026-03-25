<template>
  <div class="glass p-6 sm:p-8 w-full flex flex-col">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style="background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.2);">
        📡
      </div>
      <div>
        <h2 class="text-base font-semibold text-white leading-tight"
          style="font-family:'Space Grotesk',sans-serif;">
          Date Range Explorer
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Up to 7 days per query</p>
      </div>
    </div>

    <!-- Quick presets + date inputs in one row on wider screens -->
    <div class="flex flex-col sm:flex-row sm:items-end gap-4 mb-5">

      <!-- Presets -->
      <div class="flex-shrink-0">
        <p class="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-2">Quick Select</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="preset in presets" :key="preset.label"
            @click="applyPreset(preset)"
            class="preset-btn"
            :class="activePreset === preset.label ? 'preset-btn--active' : ''"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>

      <!-- Vertical divider (desktop) -->
      <div class="hidden sm:block w-px self-stretch my-1"
        style="background:rgba(255,255,255,0.07);"></div>

    </div>

    <!-- Date inputs (side by side) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <div>
        <label for="start-date"
          class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          v-model="startDate"
          @change="onStartDateChange"
          class="input-dark"
        />
      </div>
      <div>
        <label for="end-date"
          class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          v-model="endDate"
          :min="startDate"
          :max="maxEndDate"
          @change="onEndDateChange"
          class="input-dark"
        />
      </div>
    </div>

    <!-- Range indicator -->
    <div class="mb-5">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-xs text-slate-400">Range</span>
        <span class="text-xs font-semibold tabular-nums"
          :class="diffDays > 0 ? 'text-cyan-400' : 'text-slate-500'">
          {{ diffDays > 0 ? `${diffDays} / 7 days` : '— / 7 days' }}
        </span>
      </div>
      <div class="flex gap-1">
        <div
          v-for="i in 7" :key="i"
          class="h-1.5 flex-1 rounded-full transition-all duration-300"
          :style="i <= diffDays
            ? 'background:linear-gradient(to right,#06b6d4,#3b82f6);'
            : 'background:rgba(255,255,255,0.07);'"
        ></div>
      </div>
    </div>

    <!-- Inline error -->
    <p v-if="error" class="text-xs text-red-400 mb-3 flex items-center gap-1.5">
      <span>⚠</span> {{ error }}
    </p>

    <!-- Submit -->
    <div class="mt-auto">
      <button
        @click="submitDates"
        class="btn-glow w-full"
        :class="canSubmit ? '' : 'btn-disabled'"
        :disabled="!canSubmit"
      >
        <span>🔭</span> Search Asteroids
      </button>
    </div>

  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup(props, { emit }) {
    const startDate   = ref("");
    const endDate     = ref("");
    const error       = ref("");
    const activePreset = ref("");

    /* ── Presets ── */
    const today = () => {
      const d = new Date();
      return d.toISOString().split("T")[0];
    };
    const offsetDate = (base, days) => {
      const d = new Date(base);
      d.setDate(d.getDate() + days);
      return d.toISOString().split("T")[0];
    };

    const presets = [
      {
        label: "Today",
        apply() {
          const t = today();
          startDate.value = t;
          endDate.value   = t;
        },
      },
      {
        label: "Past 7 Days",
        apply() {
          const t = today();
          startDate.value = offsetDate(t, -6);
          endDate.value   = t;
        },
      },
      {
        label: "Next 7 Days",
        apply() {
          const t = today();
          startDate.value = t;
          endDate.value   = offsetDate(t, 6);
        },
      },
    ];

    const applyPreset = (preset) => {
      preset.apply();
      activePreset.value = preset.label;
      error.value = "";
    };

    /* ── Computed ── */
    const maxEndDate = computed(() => {
      if (!startDate.value) return "";
      const d = new Date(startDate.value);
      d.setDate(d.getDate() + 7);
      return d.toISOString().split("T")[0];
    });

    const diffDays = computed(() => {
      if (!startDate.value || !endDate.value) return 0;
      const s = new Date(startDate.value);
      const e = new Date(endDate.value);
      const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
      return diff < 0 ? 0 : diff + 1;
    });

    const canSubmit = computed(() => !!startDate.value && !!endDate.value && !error.value);

    /* ── Handlers ── */
    const onStartDateChange = () => {
      activePreset.value = "";
      error.value = "";
      if (endDate.value) {
        const end   = new Date(endDate.value);
        const start = new Date(startDate.value);
        const max   = new Date(start);
        max.setDate(max.getDate() + 7);
        if (end > max) endDate.value = "";
      }
    };

    const onEndDateChange = () => {
      activePreset.value = "";
      error.value = "";
    };

    const submitDates = () => {
      error.value = "";
      if (!startDate.value || !endDate.value) {
        error.value = "Please select both start and end dates.";
        return;
      }
      const start = new Date(startDate.value);
      const end   = new Date(endDate.value);
      if (end < start) {
        error.value = "End date must be after start date.";
        return;
      }
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 7) {
        error.value = "Date range cannot exceed 7 days.";
        return;
      }
      emit("dates-selected", startDate.value, endDate.value);
    };

    return {
      startDate, endDate, error, activePreset,
      presets, applyPreset,
      maxEndDate, diffDays, canSubmit,
      onStartDateChange, onEndDateChange, submitDates,
    };
  },
};
</script>

<style scoped>
.preset-btn {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}
.preset-btn:hover {
  background: rgba(255,255,255,0.08);
  color: #e2e8f0;
  border-color: rgba(255,255,255,0.14);
}
.preset-btn--active {
  background: rgba(6,182,212,0.12) !important;
  border-color: rgba(6,182,212,0.3) !important;
  color: #22d3ee !important;
}

.btn-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
