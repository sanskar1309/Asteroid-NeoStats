import { createApp } from 'vue';
import App from './App.vue';
import { Chart, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, Filler } from 'chart.js';
import './style.css'

Chart.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler
);

createApp(App).mount('#app');
