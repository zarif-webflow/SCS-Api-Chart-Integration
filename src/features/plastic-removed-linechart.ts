import { LineChart } from '../chart/line-chart';
import { graphData } from '../utils/static-data';

const init = () => {
  const canvasElement = document.querySelector(
    'canvas#plastic-removed-linechart'
  ) as HTMLCanvasElement | null;

  if (!canvasElement) {
    console.error("Plastic removed linechart's canvas element was not found!");
    return;
  }

  LineChart({
    canvasElement,
    labels: graphData.map((x) => x.month),
    data: graphData.map((x) => x.removedPlasticInKgs),
  });
};

init();
