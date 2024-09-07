<template>
  <div
    class="bg-space bg-cover bg-center min-h-screen flex flex-col items-center"
  >
    <h1 class="text-white text-4xl font-bold mb-20 mt-8">Asteroid Neo Stats</h1>
    <div
      class="flex flex-col justify-center items-center lg:flex-row gap-8 w-full px-4 mb-10"
    >
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
</template>

<script>
import DatePicker from "./components/DatePicker.vue";
import StatsDisplay from "./components/StatsDisplay.vue";
import LineChart from "./components/LineChart.vue";
import About from "./components/About.vue";
import { ref } from "vue";
import { getNeoData } from "./services/neoService";

export default {
  components: {
    DatePicker,
    StatsDisplay,
    LineChart,
    About,
  },
  setup() {
    // Reactive state for asteroid statistics
    const stats = ref({
      fastest: { id: "", speed: 0 },
      closest: { id: "", distance: Infinity },
      averageSize: 0,
    });
    // Reactive state for chart data
    const chartData = ref({ labels: [], datasets: [] });

    /**
     * Fetches data from NASA's NeoWs API for asteroids passing near Earth
     * within the selected date range, and updates the stats and chart.
     */
    const fetchData = async (startDate, endDate) => {
      try {
        const response = await getNeoData(startDate, endDate);
        const data = response.data.near_earth_objects;

        stats.value = calculateStats(data);
        chartData.value = prepareChartData(data);
        console.log("Chart Data:", chartData.value);
      } catch (error) {
        console.error("Error fetching data:", error);
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
          // Track the fastest asteroid
          if (speed > fastest.speed) {
            fastest = { id: asteroid.id, speed };
          }
          // Track the closest asteroid
          if (distance < closest.distance) {
            closest = { id: asteroid.id, distance };
          }
          // Sum up the size for average calculation
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
    };
  },
};
</script>
<style>
.bg-space {
  background-image: url("/src/assets/bg-imgs/space5.jpg");
}
</style>
