import { type ChartConfiguration } from 'chart.js';

import { doughnutChartData } from '../utils/static-data';
import Chart from './chart';
import { customDoughnutLegend } from './plugins/custom-doughnut-legend';

const ctx = document.getElementById('waste-composition-doughnut') as HTMLCanvasElement;

const config: ChartConfiguration<'doughnut', number[], string> = {
  type: 'doughnut',
  data: {
    labels: doughnutChartData.map((x) => x.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: doughnutChartData.map((x) => x.valueInPercentage),
        borderRadius: 16,
        borderWidth: 0,
        datalabels: { display: false },
        backgroundColor: doughnutChartData.map((x) => x.color),
        hoverBackgroundColor: doughnutChartData.map((x) => x.color),
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
      // tooltip: { enabled: false },
      tooltip: { callbacks: { label: (data) => ` ${data.raw}%` } },
      customDoughnutLegend: {
        inactiveColors: doughnutChartData.map((x) => x.inactiveColor),
      },
    },
    interaction: {},
  },

  plugins: [customDoughnutLegend],
};

new Chart(ctx, config);
