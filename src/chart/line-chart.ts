import { type ChartConfiguration } from 'chart.js/auto';
import Color from 'color';

import { CHART_Y_TICK_PADDING } from '@/utils/constants';

import Chart from './chart';

const LineChart = ({
  canvasElement,
  labels,
  data,
  dataLabel,
  color,
}: {
  canvasElement: HTMLCanvasElement;
  labels: string[];
  data: number[];
  dataLabel?: string;
  color?: string;
}) => {
  const ctx = canvasElement;
  const colorObj = Color(color || '#FFFFFF');
  const colorString = colorObj.toString();

  const config: ChartConfiguration<'line', number[], string> = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: dataLabel,
          data: data,
          borderWidth: 4,
          borderColor: colorString,
          pointStyle: 'rect',
          datalabels: {
            align: 'top',
            color: colorString,
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
          ticks: { color: colorString },
        },
        y: {
          beginAtZero: false,
          grid: {
            lineWidth: 2,
            color: (ctx) => {
              if (ctx.index === 0) return colorString;
              return colorObj.fade(0.85).toString();
            },
          },
          border: { display: false },
          ticks: {
            stepSize: 10000,
            callback: (ctx) => {
              return ctx.toString() + CHART_Y_TICK_PADDING;
            },
            color: colorString,
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
};

export { LineChart };
