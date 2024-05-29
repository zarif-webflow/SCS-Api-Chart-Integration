import { LineChart } from '@/chart/line-chart';
import { setFinishedFetchFunctions } from '@/utils/fetch-state';
import { clientId, scsClient } from '@/utils/scs-client';
import { MONTHS } from '@/utils/static-data';

(function () {
  const canvasElement = document.querySelector(
    'canvas#plastic-removed-linechart'
  ) as HTMLCanvasElement | null;

  if (!canvasElement) {
    console.error(
      "Plastic removed linechart's canvas element was not found! Make sure you have a canvas element with this id:#plastic-removed-linechart."
    );
    return;
  }

  const color = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--swatch--linechart-text');

  scsClient
    .clientProgressionOfPlasticRemoval({ clientId: clientId, year: new Date().getFullYear() })
    .then((res) => {
      const data = res;

      const labels = data.map((x) => MONTHS[x.month_No - 1]);
      const chartData = data.map((x) => x.totalPlasticRemovalKg);

      LineChart({
        canvasElement,
        labels: labels,
        data: chartData,
        color,
      });

      setFinishedFetchFunctions('clientProgressionOfPlasticRemoval');
    });
})();
