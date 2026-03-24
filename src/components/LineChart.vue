<template>
  <div class="glass p-5 sm:p-6 w-full">
    <div style="position:relative;height:340px;">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  LinearScale, CategoryScale,
  Filler,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, Filler);

export default defineComponent({
  components: { Line },
  props: {
    data: { type: Object, required: true },
  },
  setup(props) {
    const options = computed(() => ({
      responsive:          true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color:           "#94a3b8",
            usePointStyle:   true,
            pointStyleWidth: 8,
            padding:         20,
            font:            { size: 12, family: "'Inter', sans-serif" },
          },
        },
        title:  { display: false },
        tooltip: {
          backgroundColor: "rgba(10,15,30,0.92)",
          borderColor:     "rgba(255,255,255,0.08)",
          borderWidth:     1,
          titleColor:      "#f1f5f9",
          bodyColor:       "#94a3b8",
          padding:         12,
          cornerRadius:    8,
          titleFont:       { size: 13, weight: "600", family: "'Space Grotesk', sans-serif" },
          bodyFont:        { size: 12, family: "'Inter', sans-serif" },
        },
      },
      scales: {
        x: {
          type:   "category",
          labels: props.data.labels,
          ticks: {
            color: "#475569",
            font:  { size: 11, family: "'Inter', sans-serif" },
            maxRotation: 0,
          },
          grid:   { color: "rgba(255,255,255,0.04)" },
          border: { color: "rgba(255,255,255,0.07)" },
        },
        y: {
          type:     "linear",
          position: "left",
          ticks: {
            color:    "#475569",
            stepSize: 1,
            font:     { size: 11, family: "'Inter', sans-serif" },
          },
          grid:   { color: "rgba(255,255,255,0.04)" },
          border: { color: "rgba(255,255,255,0.07)" },
        },
      },
    }));

    return { options };
  },
});
</script>
