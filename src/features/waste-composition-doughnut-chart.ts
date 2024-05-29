import { DoughnutChart } from '@/chart/doughnut-chart';
import { setFinishedFetchFunctions } from '@/utils/fetch-state';
import { clientId, scsClient } from '@/utils/scs-client';
import { parseColorString } from '@/utils/util';

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

  const wasteSlideItems = [...document.querySelectorAll('[data-waste-slide]')] as HTMLElement[];

  if (wasteSlideItems.length === 0) {
    console.error('[data-waste-slide] elements were not found!');
  }

  scsClient.clientPlasticComposition({ clientId: clientId, year: 0 }).then((res) => {
    const data = res;

    const totalWeightKgRev = data.reduce((acc, curr) => acc + curr.weightKgRev, 0);

    const weightInPercentage = data.map((x) =>
      Math.max(Number.parseFloat(((x.weightKgRev / totalWeightKgRev) * 100).toFixed(2)), 0.01)
    );

    const setWasteSlideValue = (wasteSlideItem: HTMLElement, materialTypeName: string) => {
      const dataIndex = data.findIndex((x) => x.materialTypeName === materialTypeName);
      if (dataIndex === -1) {
        throw new Error(`Slide Data ${materialTypeName} wasn't found on the fetched data!`);
      }
      const wasteValueEl = wasteSlideItem.querySelector('.waste-value');
      if (!wasteValueEl) {
        throw new Error(`Slide ${materialTypeName} value element wasn't found!`);
      }
      wasteValueEl.textContent = weightInPercentage[dataIndex] + '%';
      return;
    };

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

    for (const wasteSlideItem of wasteSlideItems) {
      switch (wasteSlideItem.dataset.wasteSlide) {
        case 'plastic-bottles':
          setWasteSlideValue(wasteSlideItem, 'Plastic bottles and bottle caps');
          break;
        case 'apparel-and-textile':
          setWasteSlideValue(wasteSlideItem, 'Apparel and textile');
          break;
        case 'fishing-net-and-lines':
          setWasteSlideValue(wasteSlideItem, 'Fishing nets/line');
          break;
        case 'plastic-bags':
          setWasteSlideValue(wasteSlideItem, 'Plastic bags');
          break;
        default:
          console.error('Invalid waste slide value');
          break;
      }
    }

    setFinishedFetchFunctions('clientPlasticComposition');
  });
})();
