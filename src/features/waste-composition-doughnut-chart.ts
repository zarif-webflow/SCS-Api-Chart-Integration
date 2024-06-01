import { DoughnutChart } from '@/chart/doughnut-chart';
import { setFinishedFetchFunctions } from '@/utils/fetch-state';
import { clientId, scsClient } from '@/utils/scs-client';
import { matchIdWithText, parseColorString } from '@/utils/util';

(function () {
  const canvasElement = document.querySelector(
    'canvas#waste-composition-doughnut'
  ) as HTMLCanvasElement | null;

  if (!canvasElement) {
    console.error(
      'Waste composition canvas element was not found! Make sure you have a canvas element with this id:#waste-composition-doughnut.'
    );
    return;
  }

  const wasteCompItems = [...document.querySelectorAll('[data-waste-comp]')] as HTMLElement[];

  scsClient.clientPlasticComposition({ clientId: clientId, year: 0 }).then((res) => {
    const data = res;

    const totalWeightKgRev = data.reduce((acc, curr) => acc + curr.weightKgRev, 0);

    const weightInPercentage = data.map((x) =>
      Math.max(Number.parseFloat(((x.weightKgRev / totalWeightKgRev) * 100).toFixed(2)), 0.01)
    );

    DoughnutChart({
      canvasElement,
      labels: data.map((x) => x.materialTypeName),
      data: weightInPercentage,
      bgColors: data.map((x) => parseColorString(x.chartColorCustom).toString()),
      inactiveColors: data.map((x) =>
        parseColorString(x.chartColorCustom).desaturate(0.6).toString()
      ),
      dataUnit: '%',
      dataLabel: 'Waste composition',
    });

    for (const wasteCompItem of wasteCompItems) {
      const wasteCompId = wasteCompItem.dataset.wasteComp;

      if (wasteCompId === undefined) continue;

      const dataIndex = data.findIndex((x) => matchIdWithText(wasteCompId, x.materialTypeName));

      if (dataIndex === -1) {
        console.error(`Comp Data ${wasteCompId} wasn't found on the fetched data!`);
        continue;
      }

      const cloneEL = wasteCompItem.cloneNode();
      cloneEL.textContent = weightInPercentage[dataIndex] + '%';
      wasteCompItem.replaceWith(cloneEL);
    }

    setFinishedFetchFunctions('clientPlasticComposition');
  });
})();
