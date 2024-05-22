import { type ChartConfiguration } from 'chart.js';

import Chart from './chart';
import { customDoughnutLegend } from './plugins/custom-doughnut-legend';

const DoughnutChart = ({
  canvasElement,
  labels,
  data,
  bgColors,
  inactiveColors,
  dataUnit = '%',
  dataLabel,
}: {
  canvasElement: HTMLCanvasElement;
  labels: string[];
  data: number[];
  bgColors: string[];
  inactiveColors: string[];
  dataUnit?: string;
  dataLabel?: string;
}) => {
  const ctx = canvasElement;
  const config: ChartConfiguration<'doughnut', number[], string> = {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          label: dataLabel,
          data: data,
          borderRadius: 16,
          borderWidth: 0,
          datalabels: { display: false },
          backgroundColor: bgColors,
          hoverBackgroundColor: [...bgColors],
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (data) => ` ${data.raw}${dataUnit}`,
            labelColor(tooltipItem) {
              return {
                backgroundColor: (
                  tooltipItem.chart.data.datasets[0].hoverBackgroundColor as string[]
                )[tooltipItem.dataIndex],
                borderColor: (tooltipItem.chart.data.datasets[0].hoverBackgroundColor as string[])[
                  tooltipItem.dataIndex
                ],
              };
            },
          },
        },
        customDoughnutLegend: {
          inactiveColors: inactiveColors,
          unit: dataUnit,
        },
      },
      interaction: {},
    },

    plugins: [customDoughnutLegend],
  };

  new Chart(ctx, config);
};

export { DoughnutChart };
