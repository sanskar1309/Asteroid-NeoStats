<template>
  <div class="w-full">

    <!-- Filter tabs + per-page selector -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div class="flex flex-wrap gap-2">
        <button
          @click="setFilter('all')"
          :class="filter === 'all'
            ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
            : 'text-slate-400 hover:text-slate-300 hover:border-white/15'"
          class="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
          :style="filter === 'all' ? '' : 'background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.08);'"
        >
          All <span class="opacity-60 ml-1">{{ asteroids.length }}</span>
        </button>
        <button
          @click="setFilter('hazardous')"
          :class="filter === 'hazardous'
            ? 'bg-red-500/15 border-red-500/35 text-red-300'
            : 'text-slate-400 hover:text-slate-300 hover:border-white/15'"
          class="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
          :style="filter === 'hazardous' ? '' : 'background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.08);'"
        >
          ⚠️ Hazardous <span class="opacity-60 ml-1">{{ hazardousCount }}</span>
        </button>
      </div>

      <!-- Per-page -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400">Rows per page</span>
        <select v-model="perPage" @change="currentPage = 1"
          class="text-xs text-slate-300 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
          style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <option v-for="n in [5, 10, 20]" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
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
                class="px-4 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer select-none whitespace-nowrap transition-colors duration-150 hover:text-slate-300"
              >
                {{ col.label }}
                <span class="ml-1 text-slate-400">
                  <template v-if="sortField === col.field">{{ sortDir === 'asc' ? '▲' : '▼' }}</template>
                  <template v-else>⇅</template>
                </span>
              </th>
              <th class="px-4 py-3.5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                Status
              </th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr
              v-for="(asteroid, idx) in paginatedAsteroids"
              :key="asteroid.id"
              class="transition-colors duration-150"
              :style="rowStyle(asteroid, idx)"
            >
              <td class="px-4 py-3.5 font-medium">
                <a :href="asteroid.url" target="_blank" rel="noopener"
                  class="text-blue-400 hover:text-blue-300 transition-colors duration-150">
                  {{ asteroid.name }}
                </a>
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap text-slate-300 text-xs">
                {{ asteroid.approachDate }}
              </td>
              <td class="px-4 py-3.5 tabular-nums text-slate-300">
                {{ Number(asteroid.speed).toLocaleString() }}
              </td>
              <td class="px-4 py-3.5 tabular-nums text-slate-300">
                {{ asteroid.distanceLunar }}
                <span class="text-slate-400 text-xs ml-0.5">LD</span>
              </td>
              <td class="px-4 py-3.5 tabular-nums text-slate-300">
                {{ asteroid.sizeM }}
                <span class="text-slate-400 text-xs ml-0.5">m</span>
              </td>
              <td class="px-4 py-3.5 text-center">
                <span v-if="asteroid.isHazardous" class="badge-hazard">⚠️ Hazardous</span>
                <span v-else-if="asteroid.isSentry" class="badge-sentry">👁 Sentry</span>
                <span v-else class="text-slate-500 text-xs">—</span>
              </td>
            </tr>

            <tr v-if="paginatedAsteroids.length === 0">
              <td colspan="6" class="px-4 py-12 text-center text-slate-400 text-sm">
                No asteroids match the current filter.
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      <!-- Pagination bar (inside glass card, below table) -->
      <div v-if="totalPages > 1"
        class="flex items-center justify-between px-4 py-3"
        style="border-top:1px solid rgba(255,255,255,0.07);">

        <!-- Result info -->
        <p class="text-xs text-slate-400 tabular-nums">
          {{ rangeStart }}–{{ rangeEnd }} of {{ sortedAsteroids.length }}
        </p>

        <!-- Page controls -->
        <div class="flex items-center gap-1">
          <!-- Prev -->
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="page-btn" :class="currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-white hover:border-white/20'">
            ‹
          </button>

          <!-- Page numbers -->
          <template v-for="p in pageNumbers" :key="p">
            <span v-if="p === '...'" class="px-1 text-slate-600 text-xs select-none">…</span>
            <button v-else @click="currentPage = p"
              class="page-btn"
              :class="p === currentPage
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                : 'hover:text-white hover:border-white/20'">
              {{ p }}
            </button>
          </template>

          <!-- Next -->
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="page-btn" :class="currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:text-white hover:border-white/20'">
            ›
          </button>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <p class="text-xs text-slate-500 mt-2.5 text-right">
      LD = Lunar Distance (~384,400 km) &nbsp;·&nbsp; Click column headers to sort
    </p>

  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  props: {
    asteroids: { type: Array, required: true },
  },
  setup(props) {
    const filter      = ref("all");
    const sortField   = ref("distanceLunar");
    const sortDir     = ref("asc");
    const currentPage = ref(1);
    const perPage     = ref(10);

    const columns = [
      { field: "name",          label: "Name"         },
      { field: "approachDate",  label: "Approach Date" },
      { field: "speed",         label: "Speed (km/h)"  },
      { field: "distanceLunar", label: "Distance (LD)" },
      { field: "sizeM",         label: "Size (m)"      },
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

    const totalPages = computed(() =>
      Math.ceil(sortedAsteroids.value.length / perPage.value)
    );

    const rangeStart = computed(() =>
      sortedAsteroids.value.length === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1
    );

    const rangeEnd = computed(() =>
      Math.min(currentPage.value * perPage.value, sortedAsteroids.value.length)
    );

    const paginatedAsteroids = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      return sortedAsteroids.value.slice(start, start + perPage.value);
    });

    // Build smart page number list with ellipsis
    const pageNumbers = computed(() => {
      const total = totalPages.value;
      const cur   = currentPage.value;
      if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
      const pages = [];
      pages.push(1);
      if (cur > 3)           pages.push("...");
      for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p);
      if (cur < total - 2)   pages.push("...");
      pages.push(total);
      return pages;
    });

    // Reset to page 1 when filter/sort/perPage changes
    watch([filter, sortField, sortDir, perPage], () => { currentPage.value = 1; });

    const setFilter = (val) => { filter.value = val; };

    const sortBy = (field) => {
      if (sortField.value === field) {
        sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
      } else {
        sortField.value = field;
        sortDir.value   = "asc";
      }
    };

    const rowStyle = (asteroid, idx) => {
      if (asteroid.isHazardous)
        return "background:rgba(239,68,68,0.05);border-left:2px solid rgba(239,68,68,0.3);";
      const base = idx % 2 === 0 ? "background:rgba(255,255,255,0.015);" : "background:transparent;";
      return base + "border-left:2px solid transparent;";
    };

    return {
      filter, sortField, sortDir, currentPage, perPage,
      columns, hazardousCount,
      sortedAsteroids, paginatedAsteroids,
      totalPages, rangeStart, rangeEnd, pageNumbers,
      setFilter, sortBy, rowStyle,
    };
  },
};
</script>

<style scoped>
.page-btn {
  min-width: 30px;
  height: 30px;
  padding: 0 6px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
