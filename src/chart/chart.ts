import {
  ArcElement,
  CategoryScale,
  Chart,
  DoughnutController,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(
  ChartDataLabels,
  Tooltip,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

Chart.defaults.font.family = 'Aeonik';
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 700;

export default Chart;
