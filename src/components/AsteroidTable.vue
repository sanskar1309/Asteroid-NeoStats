<template>
  <div class="w-full">

    <!-- Filter tabs -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        @click="filter = 'all'"
        :class="filter === 'all'
          ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
          : 'text-slate-500 border-white/8 hover:text-slate-300 hover:border-white/15'"
        class="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
        style="background: transparent;"
        :style="filter === 'all' ? '' : 'background:rgba(255,255,255,0.03);'"
      >
        All &nbsp;<span class="opacity-60">{{ asteroids.length }}</span>
      </button>
      <button
        @click="filter = 'hazardous'"
        :class="filter === 'hazardous'
          ? 'bg-red-500/15 border-red-500/35 text-red-300'
          : 'text-slate-500 border-white/8 hover:text-slate-300 hover:border-white/15'"
        class="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
        :style="filter === 'hazardous' ? '' : 'background:rgba(255,255,255,0.03);'"
      >
        ⚠️ Hazardous &nbsp;<span class="opacity-60">{{ hazardousCount }}</span>
      </button>
    </div>

    <!-- Table -->
    <div class="glass overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">

          <!-- Head -->
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
              <th
                v-for="col in columns" :key="col.field"
                @click="sortBy(col.field)"
                class="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest cursor-pointer select-none whitespace-nowrap transition-colors duration-150 hover:text-slate-300"
              >
                {{ col.label }}
                <span class="ml-1 text-slate-600">
                  <template v-if="sortField === col.field">{{ sortDir === 'asc' ? '▲' : '▼' }}</template>
                  <template v-else>⇅</template>
                </span>
              </th>
              <th class="px-4 py-3.5 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                Status
              </th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr
              v-for="(asteroid, idx) in sortedAsteroids"
              :key="asteroid.id"
              class="transition-colors duration-150"
              :style="rowStyle(asteroid, idx)"
            >
              <!-- Name -->
              <td class="px-4 py-3.5 font-medium">
                <a :href="asteroid.url" target="_blank" rel="noopener"
                  class="text-blue-400 hover:text-blue-300 transition-colors duration-150">
                  {{ asteroid.name }}
                </a>
              </td>
              <!-- Approach Date -->
              <td class="px-4 py-3.5 whitespace-nowrap text-slate-400 text-xs">
                {{ asteroid.approachDate }}
              </td>
              <!-- Speed -->
              <td class="px-4 py-3.5 tabular-nums text-slate-300">
                {{ Number(asteroid.speed).toLocaleString() }}
              </td>
              <!-- Distance -->
              <td class="px-4 py-3.5 tabular-nums text-slate-300">
                {{ asteroid.distanceLunar }}
                <span class="text-slate-600 text-xs ml-0.5">LD</span>
              </td>
              <!-- Size -->
              <td class="px-4 py-3.5 tabular-nums text-slate-300">
                {{ asteroid.sizeM }}
                <span class="text-slate-600 text-xs ml-0.5">m</span>
              </td>
              <!-- Status -->
              <td class="px-4 py-3.5 text-center">
                <span v-if="asteroid.isHazardous" class="badge-hazard">⚠️ Hazardous</span>
                <span v-else-if="asteroid.isSentry"  class="badge-sentry">👁 Sentry</span>
                <span v-else class="text-slate-700 text-xs">—</span>
              </td>
            </tr>

            <!-- Empty state -->
            <tr v-if="sortedAsteroids.length === 0">
              <td colspan="6" class="px-4 py-12 text-center text-slate-600 text-sm">
                No asteroids match the current filter.
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>

    <!-- Legend -->
    <p class="text-xs text-slate-700 mt-2.5 text-right">
      LD = Lunar Distance (~384,400 km) &nbsp;·&nbsp; Click column headers to sort
    </p>

  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    asteroids: { type: Array, required: true },
  },
  setup(props) {
    const filter    = ref("all");
    const sortField = ref("distanceLunar");
    const sortDir   = ref("asc");

    const columns = [
      { field: "name",         label: "Name"          },
      { field: "approachDate", label: "Approach Date"  },
      { field: "speed",        label: "Speed (km/h)"   },
      { field: "distanceLunar",label: "Distance (LD)"  },
      { field: "sizeM",        label: "Size (m)"       },
    ];

    const hazardousCount = computed(() =>
      props.asteroids.filter((a) => a.isHazardous).length
    );

    const filtered = computed(() =>
      filter.value === "hazardous"
        ? props.asteroids.filter((a) => a.isHazardous)
        : props.asteroids
    );

    const sortedAsteroids = computed(() => {
      const list = [...filtered.value];
      list.sort((a, b) => {
        let vA = a[sortField.value];
        let vB = b[sortField.value];
        if (!isNaN(vA) && !isNaN(vB)) { vA = parseFloat(vA); vB = parseFloat(vB); }
        if (vA < vB) return sortDir.value === "asc" ? -1 : 1;
        if (vA > vB) return sortDir.value === "asc" ?  1 : -1;
        return 0;
      });
      return list;
    });

    const sortBy = (field) => {
      if (sortField.value === field) {
        sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
      } else {
        sortField.value = field;
        sortDir.value   = "asc";
      }
    };

    const rowStyle = (asteroid, idx) => {
      const base = idx % 2 === 0
        ? "background:rgba(255,255,255,0.015);"
        : "background:transparent;";
      if (asteroid.isHazardous) {
        return "background:rgba(239,68,68,0.05);border-left:2px solid rgba(239,68,68,0.3);";
      }
      return base + "border-left:2px solid transparent;";
    };

    return { filter, sortField, sortDir, columns, hazardousCount, sortedAsteroids, sortBy, rowStyle };
  },
};
</script>
