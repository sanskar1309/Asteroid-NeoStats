<template>
  <div class="text-center text-white">
    <h1 class="title">Data Visualization</h1>
    <div class="chart-container rounded-lg p-6 text-center">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default defineComponent({
  components: {
    Line, 
  },
  props: {
    data: {
      type: Object, 
      required: true, 
    },
  },
  setup(props) {
   
    const options = computed(() => ({
      responsive: true, 
      maintainAspectRatio: false, 
      plugins: {
        legend: {
          position: "top", 
        },
        title: {
          display: true,
          text: "Asteroids Passing Near Earth", 
        },
      },
      scales: {
        x: {
          type: "category",
          labels: props.data.labels,
        },
        y: {
          type: "linear",
          position: "left",
        },
      },
    }));

    return {
      options, 
    };
  },
});
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: 20px;
  background-color: #ffffff;
}
.title {
  font-size: 30px;
  font-weight: 700;
}
</style>
