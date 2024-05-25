import { LineChart } from '@/chart/line-chart';
import { setFinishedFetchFunctions } from '@/utils/fetch-state';
import { clientId, scsClient } from '@/utils/scs-client';
import { graphData } from '@/utils/static-data';

(function () {
  const canvasElement = document.querySelector(
    'canvas#plastic-removed-linechart'
  ) as HTMLCanvasElement | null;

  if (!canvasElement) {
    console.error("Plastic removed linechart's canvas element was not found!");
    return;
  }
  scsClient.clientProgressionOfPlasticRemoval({ clientId: clientId, year: 2024 }).then((res) => {
    const data = res;

    const labels = data.map((x) => graphData[x.month_No - 1].month);
    const chartData = data.map((x) => x.totalPlasticRemovalKg);

    LineChart({
      canvasElement,
      labels: labels,
      data: chartData,
    });

    setFinishedFetchFunctions('clientProgressionOfPlasticRemoval');
  });
})();
