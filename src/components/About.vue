<template>
  <div class="glass p-6 w-full max-w-sm">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.2);">
        🛸
      </div>
      <h2 class="text-base font-semibold text-white" style="font-family:'Space Grotesk',sans-serif;">
        About This Project
      </h2>
    </div>

    <p class="text-slate-400 text-sm leading-relaxed mb-3">
      Real-time near-Earth asteroid tracking using NASA's NeoWs API. Explore
      data on asteroids passing close to Earth within any 7-day window.
    </p>
    <p class="text-slate-400 text-sm leading-relaxed">
      Identify potentially hazardous objects, compare velocity and proximity
      data, and visualise trends across your selected date range.
    </p>

    <div class="mt-5 pt-4 flex flex-wrap gap-2"
      style="border-top:1px solid rgba(255,255,255,0.06);">
      <span class="text-xs px-2.5 py-1 rounded-md text-slate-500"
        style="background:rgba(255,255,255,0.05);">Near-Earth Objects</span>
      <span class="text-xs px-2.5 py-1 rounded-md text-slate-500"
        style="background:rgba(255,255,255,0.05);">Hazard Detection</span>
      <span class="text-xs px-2.5 py-1 rounded-md text-slate-500"
        style="background:rgba(255,255,255,0.05);">Live NASA Data</span>
    </div>
  </div>
</template>

<script>
export default { name: "About" };
</script>
