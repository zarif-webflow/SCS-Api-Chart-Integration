import Color from 'color';

import { DoughnutChart } from '../chart/doughnut-chart';
import { doughnutChartData } from '../utils/static-data';

const init = () => {
  const canvasElement = document.querySelector(
    'canvas#waste-composition-doughnut'
  ) as HTMLCanvasElement | null;

  if (!canvasElement) {
    console.error('Waste composition canvas element was not found!');
    return;
  }

  DoughnutChart({
    canvasElement,
    labels: doughnutChartData.map((x) => x.label),
    data: doughnutChartData.map((x) => x.valueInPercentage),
    bgColors: doughnutChartData.map((x) => x.color),
    inactiveColors: doughnutChartData.map((x) => Color(x.color).desaturate(0.6).toString()),
    dataUnit: '%',
    dataLabel: 'Waste composition',
  });
};

init();
