<template>
  <div class="w-full">

    <!-- Top: brand left | description right -->
    <div class="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">

      <!-- Brand -->
      <div class="flex-shrink-0 lg:w-56">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
            style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.2);">
            ☄️
          </div>
          <div>
            <p class="text-sm font-semibold text-white" style="font-family:'Space Grotesk',sans-serif;">
              Asteroid NeoStats
            </p>
            <p class="text-xs text-slate-300">Near Earth Object Tracker</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <span class="tag">Near-Earth Objects</span>
          <span class="tag">Hazard Detection</span>
          <span class="tag">Live NASA Data</span>
          <span class="tag">7-Day Windows</span>
        </div>
      </div>

      <!-- Vertical divider -->
      <div class="hidden lg:block w-px self-stretch flex-shrink-0"
        style="background:rgba(255,255,255,0.06);"></div>

      <!-- Description -->
      <div class="flex-1 space-y-2">
        <p class="text-slate-200 text-sm leading-relaxed">
          Real-time data on asteroids approaching Earth, sourced directly from
          <a href="https://api.nasa.gov/" target="_blank" rel="noopener"
            class="text-blue-400 hover:text-blue-300 transition-colors">NASA's NeoWs API</a>.
          Select any 7-day window to explore what's passing through our cosmic neighbourhood.
        </p>
        <p class="text-slate-300 text-xs leading-relaxed">
          The Near Earth Object Web Service (NeoWs) is a RESTful web service maintained by NASA's Jet
          Propulsion Laboratory (JPL). It tracks asteroids and comets with orbits that bring them within
          1.3 AU of the Sun — classified as Near-Earth Objects (NEOs).
        </p>
      </div>
    </div>

    <!-- Feature strip -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
      <div class="feature-tile">
        <span class="feature-icon" style="background:rgba(96,165,250,0.1);border-color:rgba(96,165,250,0.18);">🚀</span>
        <div>
          <p class="text-xs font-semibold text-slate-200">Velocity</p>
          <p class="text-xs text-slate-300 leading-snug mt-0.5">Relative speed in km/h at closest Earth approach</p>
        </div>
      </div>
      <div class="feature-tile">
        <span class="feature-icon" style="background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.16);">🎯</span>
        <div>
          <p class="text-xs font-semibold text-slate-200">Proximity</p>
          <p class="text-xs text-slate-300 leading-snug mt-0.5">Miss distance in km &amp; lunar units (LD ≈ 384,400 km)</p>
        </div>
      </div>
      <div class="feature-tile">
        <span class="feature-icon" style="background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.16);">⚠️</span>
        <div>
          <p class="text-xs font-semibold text-slate-200">Hazard Alerts</p>
          <p class="text-xs text-slate-300 leading-snug mt-0.5">PHAs flagged by NASA — &gt;140 m within 0.05 AU</p>
        </div>
      </div>
      <div class="feature-tile">
        <span class="feature-icon" style="background:rgba(168,85,247,0.08);border-color:rgba(168,85,247,0.16);">🪨</span>
        <div>
          <p class="text-xs font-semibold text-slate-200">Size Estimates</p>
          <p class="text-xs text-slate-300 leading-snug mt-0.5">Estimated diameter from absolute magnitude &amp; albedo</p>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="w-full mb-8" style="height:1px;background:rgba(255,255,255,0.05);"></div>

    <!-- Bottom: How to use | Data glossary | Data source -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <!-- How to use -->
      <div>
        <p class="text-xs font-semibold text-slate-200 mb-3 uppercase tracking-wider">How to use</p>
        <ol class="space-y-2.5">
          <li class="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
            <span class="step-num">1</span>
            <span>Pick a start and end date (up to 7 days apart) using the date picker above.</span>
          </li>
          <li class="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
            <span class="step-num">2</span>
            <span>For API access, visit <a href="https://api.nasa.gov/" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 transition-colors">api.nasa.gov</a> → Browse APIs → <span class="text-slate-200">Asteroids - NeoWs</span>.</span>
          </li>
          <li class="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
            <span class="step-num">3</span>
            <span>Review the mission overview cards, proximity timeline chart, and the full asteroid catalog below.</span>
          </li>
          <li class="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
            <span class="step-num">4</span>
            <span>Click any asteroid name to open its official JPL Small-Body Database page.</span>
          </li>
        </ol>
      </div>

      <!-- Data glossary -->
      <div>
        <p class="text-xs font-semibold text-slate-200 mb-3 uppercase tracking-wider">Data glossary</p>
        <dl class="space-y-2 pl-3">
          <div>
            <dt class="text-xs font-medium text-slate-200">PHA</dt>
            <dd class="text-xs text-slate-300 leading-snug">Potentially Hazardous Asteroid — diameter &gt;140 m and miss distance &lt;0.05 AU (~19.5 LD).</dd>
          </div>
          <div>
            <dt class="text-xs font-medium text-slate-200">Lunar Distance (LD)</dt>
            <dd class="text-xs text-slate-300 leading-snug">Average Earth–Moon distance ≈ 384,400 km. Used as a yardstick for close approaches.</dd>
          </div>
          <div>
            <dt class="text-xs font-medium text-slate-200">Sentry Object</dt>
            <dd class="text-xs text-slate-300 leading-snug">Asteroid on NASA's Sentry impact-risk list, undergoing long-term monitoring for potential Earth impact.</dd>
          </div>
          <div>
            <dt class="text-xs font-medium text-slate-200">Absolute Magnitude (H)</dt>
            <dd class="text-xs text-slate-300 leading-snug">Intrinsic brightness. Combined with surface reflectivity (albedo) it yields the size estimate shown here.</dd>
          </div>
        </dl>
      </div>

      <!-- Data source -->
      <div>
        <p class="text-xs font-semibold text-slate-200 mb-3 uppercase tracking-wider">Data source</p>
        <div class="info-card mb-2">
          <p class="text-xs font-medium text-white mb-1">NASA NeoWs API</p>
          <p class="text-xs text-slate-400 leading-snug">
            Operated by NASA's Center for Near Earth Object Studies (CNEOS) at JPL, Pasadena, CA.
            Updated daily as new observations arrive from ground and space-based telescopes.
          </p>
        </div>
        <div class="info-card">
          <p class="text-xs font-medium text-white mb-1">Query window</p>
          <p class="text-xs text-slate-400 leading-snug">
            The API allows a maximum look-ahead of 7 days per request. All times are UTC.
            Historical data is available back to 1900.
          </p>
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
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem;
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
  flex-shrink: 0;
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
  color: #cbd5e1;
  letter-spacing: 0.02em;
}
.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.6rem;
  font-weight: 600;
  background: rgba(59,130,246,0.12);
  border: 1px solid rgba(59,130,246,0.2);
  color: #60a5fa;
}
.info-card {
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.05);
}
</style>
