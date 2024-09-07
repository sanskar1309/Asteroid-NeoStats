<template>
  <div class="bg-space bg-cover bg-center min-h-screen flex flex-col items-center">
    <Loader v-if="loading" /> 
    <div v-else>
      <h1 class="text-white text-4xl font-bold mb-20 mt-8 text-center">Asteroid Neo Stats</h1>
      <div class="flex flex-col justify-center items-center lg:flex-row gap-8 w-full px-4 mb-10">
        <About />
        <div class="flex flex-col gap-4">
          <DatePicker @dates-selected="fetchData" />
        </div>
      </div>
      <div class="flex justify-center items-center w-full">
        <StatsDisplay :stats="stats" />
      </div>
      <div class="flex justify-center items-center py-8 px-4 w-full mb-20">
        <LineChart :data="chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "./components/DatePicker.vue";
import StatsDisplay from "./components/StatsDisplay.vue";
import LineChart from "./components/LineChart.vue";
import About from "./components/About.vue";
import Loader from "./components/Loader.vue"; 
import { ref } from "vue";
import { getNeoData } from "./services/neoService";

export default {
  components: {
    DatePicker,
    StatsDisplay,
    LineChart,
    About,
    Loader,
  },
  setup() {
    const stats = ref({
      fastest: { id: "", speed: 0 },
      closest: { id: "", distance: Infinity },
      averageSize: 0,
    });
    const chartData = ref({ labels: [], datasets: [] });
    const loading = ref(false); // State to manage loading

    /**
     * Fetches data from NASA's NeoWs API for asteroids passing near Earth
     * within the selected date range, and updates the stats and chart.
     */
    const fetchData = async (startDate, endDate) => {
      loading.value = true; // Show loader
      try {
        const response = await getNeoData(startDate, endDate);
        const data = response.data.near_earth_objects;

        stats.value = calculateStats(data);
        chartData.value = prepareChartData(data);
        console.log("Chart Data:", chartData.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false; // Hide loader
      }
    };

    /**
     * Calculate the fastest, closest, and average size of asteroids.
     * @param {Object} data - Asteroids data grouped by date.
     */
    const calculateStats = (data) => {
      let fastest = { id: "", speed: 0 };
      let closest = { id: "", distance: Infinity };
      let totalSize = 0;
      let count = 0;

      Object.keys(data).forEach((date) => {
        data[date].forEach((asteroid) => {
          const speed =
            asteroid.close_approach_data[0].relative_velocity
              .kilometers_per_hour;
          const distance =
            asteroid.close_approach_data[0].miss_distance.kilometers;
          const size =
            (asteroid.estimated_diameter.kilometers.estimated_diameter_max +
              asteroid.estimated_diameter.kilometers.estimated_diameter_min) /
            2;

          if (speed > fastest.speed) {
            fastest = { id: asteroid.id, speed };
          }

          if (distance < closest.distance) {
            closest = { id: asteroid.id, distance };
          }

          totalSize += size;
          count++;
        });
      });

      return {
        fastest,
        closest,
        averageSize: count > 0 ? (totalSize / count).toFixed(2) : 0,
      };
    };

    /**
     * Prepares chart data showing the number of asteroids passing near Earth
     * for each selected date.
     * @param {Object} data - Asteroids data grouped by date.
     */
    const prepareChartData = (data) => {
      const labels = [];
      const datasets = [
        {
          label: "Asteroids Passing Near Earth",
          data: [],
          borderColor: "#42A5F5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
        },
      ];

      Object.keys(data).forEach((date) => {
        labels.push(date);
        datasets[0].data.push(data[date].length);
      });

      return {
        labels,
        datasets,
      };
    };

    return {
      stats,
      chartData,
      fetchData,
      loading,
    };
  },
};
</script>

<style>
.bg-space {
  background-image: url("/src/assets/bg-imgs/space5.jpg");
}
</style>
