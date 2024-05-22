import './style.css';

import { type ChartConfiguration } from 'chart.js/auto';

import { graphData } from '../utils/static-data';
import Chart from './chart';

const ctx = document.getElementById('myChart') as HTMLCanvasElement;

const config: ChartConfiguration<'line', number[], string> = {
  type: 'line',
  data: {
    labels: graphData.map((x) => x.month),
    datasets: [
      {
        label: '# of Votes',
        data: graphData.map((x) => x.removedPlasticInKgs),
        borderWidth: 4,
        borderColor: '#fff',
        pointStyle: 'rect',
        datalabels: {
          align: 'top',
          display: (ctx) => ctx.dataIndex !== 0,
          color: '#fff',
        },
      },
    ],
  },

  options: {
    maintainAspectRatio: false,
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        offset: true,
        ticks: { color: '#fff' },
      },
      y: {
        beginAtZero: false,
        grid: {
          lineWidth: 2,
          color: (ctx) => {
            if (ctx.index === 0) return 'rgb(255, 255, 255)';
            return 'rgb(255, 255, 255, 0.15)';
          },
        },
        border: { display: false },
        ticks: {
          stepSize: 10000,
          callback: (ctx) => {
            return ctx.toString() + '    ';
          },
          color: '#fff',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        font: { size: 12, weight: 400, family: 'Aeonik' },
      },
    },
  },
};

let graph = new Chart(ctx, config);

document.fonts.ready.then(() => {
  graph.destroy();
  graph = new Chart(ctx, config);
});
