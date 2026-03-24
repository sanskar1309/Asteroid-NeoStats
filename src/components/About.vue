<template>
  <div class="w-full">

    <!-- Top row: brand + description | feature tiles -->
    <div class="flex flex-col lg:flex-row gap-10 mb-8">

      <!-- Left: brand block -->
      <div class="lg:max-w-xs flex-shrink-0">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
            style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.2);">
            ☄️
          </div>
          <div>
            <p class="text-sm font-semibold text-white" style="font-family:'Space Grotesk',sans-serif;">
              Asteroid NeoStats
            </p>
            <p class="text-xs text-slate-400">Near Earth Object Tracker</p>
          </div>
        </div>
        <p class="text-slate-300 text-sm leading-relaxed mb-4">
          Real-time data on asteroids approaching Earth, sourced directly from
          <a href="https://api.nasa.gov/" target="_blank" rel="noopener"
            class="text-blue-500 hover:text-blue-400 transition-colors">NASA's NeoWs API</a>.
          Select any 7-day window to explore what's passing through our cosmic neighbourhood.
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="tag">Near-Earth Objects</span>
          <span class="tag">Hazard Detection</span>
          <span class="tag">Live NASA Data</span>
          <span class="tag">7-Day Windows</span>
        </div>
      </div>

      <!-- Vertical divider (desktop) -->
      <div class="hidden lg:block w-px self-stretch"
        style="background:rgba(255,255,255,0.06);"></div>

      <!-- Right: feature tiles -->
      <div class="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="feature-tile">
          <span class="feature-icon" style="background:rgba(96,165,250,0.1);border-color:rgba(96,165,250,0.18);">🚀</span>
          <p class="text-xs font-semibold text-slate-300 mt-2">Velocity</p>
          <p class="text-xs text-slate-400 mt-0.5 leading-snug">Relative speed in km/h for every asteroid</p>
        </div>
        <div class="feature-tile">
          <span class="feature-icon" style="background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.16);">🎯</span>
          <p class="text-xs font-semibold text-slate-300 mt-2">Proximity</p>
          <p class="text-xs text-slate-400 mt-0.5 leading-snug">Miss distance in km &amp; lunar units</p>
        </div>
        <div class="feature-tile">
          <span class="feature-icon" style="background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.16);">⚠️</span>
          <p class="text-xs font-semibold text-slate-300 mt-2">Hazard Alerts</p>
          <p class="text-xs text-slate-400 mt-0.5 leading-snug">NASA-flagged potentially hazardous objects</p>
        </div>
        <div class="feature-tile">
          <span class="feature-icon" style="background:rgba(168,85,247,0.08);border-color:rgba(168,85,247,0.16);">🪨</span>
          <p class="text-xs font-semibold text-slate-300 mt-2">Size Estimates</p>
          <p class="text-xs text-slate-400 mt-0.5 leading-snug">Estimated diameter in meters or km</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default { name: "About" };
</script>

<style scoped>
.feature-tile {
  padding: 0.875rem;
  border-radius: 10px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.05);
  transition: background 0.2s;
}
.feature-tile:hover {
  background: rgba(255,255,255,0.04);
}
.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 0.875rem;
  border: 1px solid;
}
.tag {
  font-size: 0.68rem;
  padding: 2px 9px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  color: #94a3b8;
  letter-spacing: 0.02em;
}
</style>
