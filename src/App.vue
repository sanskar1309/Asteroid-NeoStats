<template>
  <div class="relative min-h-screen overflow-x-hidden" style="background-color: #030712;">

    <!-- ── Starfield layers ── -->
    <div class="stars-sm" aria-hidden="true"></div>
    <div class="stars-md" aria-hidden="true"></div>
    <div class="stars-lg" aria-hidden="true"></div>

    <!-- ── Ambient nebula glow ── -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none" style="z-index:0;" aria-hidden="true">
      <div class="absolute rounded-full"
        style="top:-15%;left:-8%;width:640px;height:640px;
               background:radial-gradient(circle,rgba(59,130,246,0.10) 0%,transparent 70%);
               filter:blur(72px);"></div>
      <div class="absolute rounded-full"
        style="top:35%;right:-12%;width:540px;height:540px;
               background:radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%);
               filter:blur(90px);"></div>
      <div class="absolute rounded-full"
        style="bottom:-12%;left:30%;width:480px;height:480px;
               background:radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 70%);
               filter:blur(80px);"></div>
    </div>

    <!-- ── Loader ── -->
    <Loader v-if="loading" />

    <!-- ── Main shell ── -->
    <div v-else class="relative" style="z-index:1;">

      <!-- ===== HEADER ===== -->
      <header class="sticky top-0 border-b"
        style="z-index:50;
               border-color:rgba(255,255,255,0.06);
               background:rgba(3,7,18,0.75);
               backdrop-filter:blur(14px);
               -webkit-backdrop-filter:blur(14px);">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl leading-none" style="filter:drop-shadow(0 0 8px rgba(96,165,250,0.6));">☄️</span>
            <span class="text-lg font-bold tracking-tight text-white" style="font-family:'Space Grotesk',sans-serif;">
              Asteroid <span class="text-blue-400">NeoStats</span>
            </span>
          </div>
          <span class="badge-nasa hidden sm:inline-flex">Powered by NASA NeoWs</span>
        </div>
      </header>

      <!-- ===== HERO ===== -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 badge-nasa mb-5">
            <span>🛰</span> Near Earth Object Web Service
          </div>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
            style="font-family:'Space Grotesk',sans-serif;
                   text-shadow:0 0 40px rgba(59,130,246,0.35);">
            Track Near-Earth<br class="hidden sm:block" /> Asteroids
          </h2>
          <p class="text-slate-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Real-time asteroid data from NASA's NeoWs API. Select a date range to
            explore proximity, velocity, size, and hazard data.
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-5 items-start justify-center">
          <About />
          <DatePicker @dates-selected="fetchData" />
        </div>
      </section>

      <!-- ===== DATA SECTIONS (post-fetch) ===== -->
      <template v-if="stats.totalCount > 0">

        <!-- Stats -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-12 animate-fade-in-up">
          <div class="flex items-center gap-4 mb-6">
            <h3 class="section-heading whitespace-nowrap">📊 Mission Overview</h3>
            <div class="flex-1 gradient-line"></div>
          </div>
          <StatsDisplay :stats="stats" />
        </section>

        <!-- Chart -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-12 animate-fade-in-up">
          <div class="flex items-center gap-4 mb-6">
            <h3 class="section-heading whitespace-nowrap">📈 Proximity Timeline</h3>
            <div class="flex-1 gradient-line"></div>
          </div>
          <LineChart :data="chartData" />
        </section>

        <!-- Table -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in-up">
          <div class="flex items-center gap-4 mb-6">
            <h3 class="section-heading whitespace-nowrap">🌍 Asteroid Catalog</h3>
            <div class="flex-1 gradient-line"></div>
          </div>
          <AsteroidTable :asteroids="asteroids" />
        </section>

      </template>

      <!-- ===== FOOTER ===== -->
      <footer class="border-t py-8 text-center"
        style="border-color:rgba(255,255,255,0.05);">
        <p class="text-slate-600 text-sm">
          Data from
          <a href="https://api.nasa.gov/" target="_blank" rel="noopener"
            class="text-slate-500 hover:text-blue-400 transition-colors duration-200">
            NASA's Near Earth Object Web Service
          </a>
          &nbsp;·&nbsp; Asteroid NeoStats
        </p>
      </footer>

    </div>
  </div>
</template>

<script>
import DatePicker    from "./components/DatePicker.vue";
import StatsDisplay  from "./components/StatsDisplay.vue";
import LineChart     from "./components/LineChart.vue";
import AsteroidTable from "./components/AsteroidTable.vue";
import About         from "./components/About.vue";
import Loader        from "./components/Loader.vue";
import { ref }       from "vue";
import { getNeoData } from "./services/neoService";

export default {
  components: { DatePicker, StatsDisplay, LineChart, AsteroidTable, About, Loader },

  setup() {
    const stats = ref({
      fastest:       { id: "", name: "", speed: 0, isHazardous: false, url: "" },
      closest:       { id: "", name: "", distance: Infinity, distanceLunar: 0, isHazardous: false, url: "" },
      largest:       { id: "", name: "", size: 0, isHazardous: false, url: "" },
      averageSize:   0,
      totalCount:    0,
      hazardousCount: 0,
    });
    const chartData = ref({ labels: [], datasets: [] });
    const asteroids  = ref([]);
    const loading    = ref(false);

    const fetchData = async (startDate, endDate) => {
      loading.value = true;
      try {
        const response = await getNeoData(startDate, endDate);
        const data = response.data.near_earth_objects;

        stats.value     = calculateStats(data);
        chartData.value = prepareChartData(data);
        asteroids.value = Object.values(data).flat().map((a) => ({
          id:           a.id,
          name:         a.name,
          url:          a.nasa_jpl_url,
          speed:        parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0),
          distanceKm:   parseFloat(a.close_approach_data[0].miss_distance.kilometers).toFixed(0),
          distanceLunar: parseFloat(a.close_approach_data[0].miss_distance.lunar).toFixed(2),
          sizeM:        ((a.estimated_diameter.meters.estimated_diameter_max + a.estimated_diameter.meters.estimated_diameter_min) / 2).toFixed(1),
          approachDate: a.close_approach_data[0].close_approach_date_full,
          isHazardous:  a.is_potentially_hazardous_asteroid,
          isSentry:     a.is_sentry_object,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    const calculateStats = (data) => {
      let fastest  = { id: "", name: "", speed: 0, isHazardous: false, url: "" };
      let closest  = { id: "", name: "", distance: Infinity, distanceLunar: 0, isHazardous: false, url: "" };
      let largest  = { id: "", name: "", size: 0, isHazardous: false, url: "" };
      let totalSize = 0, count = 0, hazardousCount = 0;

      Object.keys(data).forEach((date) => {
        data[date].forEach((a) => {
          const speed        = parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_hour);
          const distance     = parseFloat(a.close_approach_data[0].miss_distance.kilometers);
          const distanceLunar = parseFloat(a.close_approach_data[0].miss_distance.lunar);
          const sizeAvg      = (a.estimated_diameter.meters.estimated_diameter_max + a.estimated_diameter.meters.estimated_diameter_min) / 2;
          const isHazardous  = a.is_potentially_hazardous_asteroid;

          if (isHazardous) hazardousCount++;
          if (speed    > fastest.speed)    fastest = { id: a.id, name: a.name, speed, isHazardous, url: a.nasa_jpl_url };
          if (distance < closest.distance) closest = { id: a.id, name: a.name, distance, distanceLunar: distanceLunar.toFixed(2), isHazardous, url: a.nasa_jpl_url };
          if (sizeAvg  > largest.size)     largest  = { id: a.id, name: a.name, size: sizeAvg.toFixed(1), isHazardous, url: a.nasa_jpl_url };

          totalSize += (a.estimated_diameter.kilometers.estimated_diameter_max + a.estimated_diameter.kilometers.estimated_diameter_min) / 2;
          count++;
        });
      });

      return { fastest, closest, largest, averageSize: count > 0 ? (totalSize / count).toFixed(2) : 0, totalCount: count, hazardousCount };
    };

    const prepareChartData = (data) => {
      const labels   = [];
      const datasets = [
        {
          label:              "All Asteroids",
          data:               [],
          borderColor:        "#60a5fa",
          backgroundColor:    "rgba(96,165,250,0.08)",
          borderWidth:        2,
          pointBackgroundColor: "#60a5fa",
          pointRadius:        4,
          pointHoverRadius:   6,
          tension:            0.35,
          fill:               true,
        },
        {
          label:              "Potentially Hazardous",
          data:               [],
          borderColor:        "#f87171",
          backgroundColor:    "rgba(248,113,113,0.08)",
          borderWidth:        2,
          pointBackgroundColor: "#f87171",
          pointRadius:        4,
          pointHoverRadius:   6,
          tension:            0.35,
          fill:               true,
        },
      ];

      Object.keys(data).sort().forEach((date) => {
        labels.push(date);
        datasets[0].data.push(data[date].length);
        datasets[1].data.push(data[date].filter((a) => a.is_potentially_hazardous_asteroid).length);
      });

      return { labels, datasets };
    };

    return { stats, chartData, asteroids, fetchData, loading };
  },
};
</script>
