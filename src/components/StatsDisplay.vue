<template>
  <div class="space-y-5">

    <!-- ── Summary row ── -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

      <!-- Total -->
      <div class="glass p-5 text-center">
        <p class="stat-num text-blue-400">{{ stats.totalCount || 0 }}</p>
        <p class="text-slate-300 text-sm mt-1.5 font-medium">Total Asteroids</p>
      </div>

      <!-- Hazardous -->
      <div class="glass p-5 text-center transition-all duration-300"
        :style="stats.hazardousCount > 0
          ? 'border-color:rgba(239,68,68,0.25);box-shadow:0 0 24px rgba(239,68,68,0.08);'
          : ''">
        <p class="stat-num" :class="stats.hazardousCount > 0 ? 'text-red-400' : 'text-slate-400'">
          {{ stats.hazardousCount || 0 }}
        </p>
        <p class="text-slate-300 text-sm mt-1.5 font-medium">
          <span v-if="stats.hazardousCount > 0">⚠️ </span>Potentially Hazardous
        </p>
      </div>

      <!-- Avg size -->
      <div class="glass p-5 text-center">
        <p class="stat-num text-cyan-400">{{ stats.averageSize || '—' }}</p>
        <p class="text-slate-300 text-sm mt-1.5 font-medium">Avg. Size (km)</p>
      </div>

    </div>

    <!-- ── Detail cards ── -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <!-- Fastest -->
      <div class="glass-hover p-5">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style="background:rgba(96,165,250,0.12);border:1px solid rgba(96,165,250,0.18);">
              🚀
            </div>
            <span class="text-xs font-bold text-slate-300 uppercase tracking-widest">Fastest</span>
          </div>
          <span v-if="stats.fastest.isHazardous" class="badge-hazard">HAZARDOUS</span>
        </div>
        <template v-if="stats.fastest.name">
          <a :href="stats.fastest.url" target="_blank" rel="noopener"
            class="block text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors truncate mb-3"
            :title="stats.fastest.name">{{ stats.fastest.name }}</a>
          <p class="text-3xl font-bold text-white tabular-nums leading-none"
            style="font-family:'Space Grotesk',sans-serif;">
            {{ Number(stats.fastest.speed).toLocaleString() }}
          </p>
          <p class="text-xs text-slate-400 mt-1.5">km/h relative velocity</p>
        </template>
        <p v-else class="text-slate-500 text-sm italic">No data yet</p>
      </div>

      <!-- Closest -->
      <div class="glass-hover p-5">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.18);">
              🎯
            </div>
            <span class="text-xs font-bold text-slate-300 uppercase tracking-widest">Closest</span>
          </div>
          <span v-if="stats.closest.isHazardous" class="badge-hazard">HAZARDOUS</span>
        </div>
        <template v-if="stats.closest.name">
          <a :href="stats.closest.url" target="_blank" rel="noopener"
            class="block text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors truncate mb-3"
            :title="stats.closest.name">{{ stats.closest.name }}</a>
          <p class="text-3xl font-bold text-white tabular-nums leading-none"
            style="font-family:'Space Grotesk',sans-serif;">
            {{ Number(stats.closest.distance).toLocaleString(undefined,{maximumFractionDigits:0}) }}
          </p>
          <p class="text-xs text-slate-400 mt-1.5">km miss distance</p>
          <p class="text-xs mt-1" style="color:rgba(100,116,139,0.7);">
            {{ stats.closest.distanceLunar }} lunar distances
          </p>
        </template>
        <p v-else class="text-slate-500 text-sm italic">No data yet</p>
      </div>

      <!-- Largest -->
      <div class="glass-hover p-5 sm:col-span-2 lg:col-span-1">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.18);">
              🪨
            </div>
            <span class="text-xs font-bold text-slate-300 uppercase tracking-widest">Largest</span>
          </div>
          <span v-if="stats.largest.isHazardous" class="badge-hazard">HAZARDOUS</span>
        </div>
        <template v-if="stats.largest.name">
          <a :href="stats.largest.url" target="_blank" rel="noopener"
            class="block text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors truncate mb-3"
            :title="stats.largest.name">{{ stats.largest.name }}</a>
          <p class="text-3xl font-bold text-white tabular-nums leading-none"
            style="font-family:'Space Grotesk',sans-serif;">
            ~{{ stats.largest.size }}
          </p>
          <p class="text-xs text-slate-400 mt-1.5">meters estimated diameter</p>
        </template>
        <p v-else class="text-slate-500 text-sm italic">No data yet</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: { stats: { type: Object, required: true } },
};
</script>
