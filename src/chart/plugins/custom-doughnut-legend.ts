import { type Chart as ChartType, type Plugin } from 'chart.js';

export const customDoughnutLegend: Plugin<'doughnut', { unit: string; inactiveColors: string[] }> =
  {
    id: 'customDoughnutLegend',
    afterInit: (chart, _, { unit = '%', inactiveColors }) => {
      const legendContainer = chart.canvas
        .closest('.doughnut-container')
        ?.querySelector('.doughnut-legend-container');

      if (!legendContainer) {
        console.error(`Legend container element was not found!`);
        return;
      }

      legendContainer.innerHTML = '';

      const labels = chart.data.labels as string[];
      const dataset = chart.data.datasets.at(0);

      if (!dataset) {
        console.error(`Something went wrong with dataset!`);
        return;
      }

      const bgColorSetters = dataset.backgroundColor as string[];

      const allLegendItems: HTMLElement[] = [];

      labels.forEach((label, i) => {
        const data = dataset.data.at(i);
        const color = bgColorSetters.at(i);
        if (!data) {
          console.error(`Data wasn't found for label index ${i}!`);
          return;
        }
        if (!color) {
          console.error(`BG Color wasn't found for label index ${i}!`);
          return;
        }

        const legendItem = document.createElement('li');
        legendItem.classList.add('doughnut-legend-item');
        legendItem.dataset.legendIndex = i.toString();

        const legendCircle = document.createElement('div');
        legendCircle.classList.add('doughnut-legend-circle');
        legendCircle.style.backgroundColor = color;

        const legendValue = document.createElement('p');
        legendValue.appendChild(document.createTextNode(`${data.toFixed(2)}${unit}`));
        legendValue.classList.add('doughnut-legend-value');

        const legendTitle = document.createElement('p');
        legendTitle.appendChild(document.createTextNode(label));
        legendTitle.classList.add('doughnut-legend-title');

        legendItem.appendChild(legendCircle);
        legendItem.appendChild(legendValue);
        legendItem.appendChild(legendTitle);

        legendContainer.appendChild(legendItem);
        allLegendItems.push(legendItem);
      });

      const highlighter = new HighlightDoughnutSlice(chart, inactiveColors);

      chart.canvas.addEventListener('mousemove', () => {
        const activeElements = chart.getActiveElements();
        if (activeElements.length === 0) {
          highlighter.removeHighlight();
          return;
        }
        highlighter.highlightSlice(activeElements[0].index);
      });
      chart.canvas.addEventListener('mouseleave', () => {
        highlighter.removeHighlight();
      });

      allLegendItems.forEach((item, i) => {
        item.addEventListener('mouseenter', () => {
          highlighter.highlightSlice(i, true);
        });
        item.addEventListener('mouseleave', () => {
          highlighter.removeHighlight(true);
        });
      });
    },
  };

class HighlightDoughnutSlice {
  chart: ChartType<'doughnut', number[], unknown>;
  inactiveColors: string[];
  currentActiveIndex: number | undefined;
  legendElements: HTMLElement[];
  constructor(
    chart: ChartType<'doughnut', number[], unknown>,
    inactiveColors: string[],
    legendElements?: HTMLElement[]
  ) {
    this.chart = chart;
    this.inactiveColors = inactiveColors;
    this.currentActiveIndex = undefined;
    this.legendElements =
      legendElements ||
      ((chart.canvas.closest('.doughnut-container')?.querySelectorAll('.doughnut-legend-item') ||
        []) as HTMLElement[]);
  }

  highlightSlice(highlightIndex: number, isHover: boolean = false) {
    if (highlightIndex === this.currentActiveIndex) return;
    if (isHover) {
      this.chart.setActiveElements([{ datasetIndex: 0, index: highlightIndex }]);
      this.chart.tooltip?.setActiveElements([{ datasetIndex: 0, index: highlightIndex }], {
        x: 0,
        y: 0,
      });
    }
    this.inactiveColors.forEach((inactiveColor, i) => {
      this.legendElements[highlightIndex].classList.remove('deactive');
      if (highlightIndex === i) return;
      (this.chart.data.datasets[0].backgroundColor as string[])[i] = inactiveColor;
      this.legendElements[i].classList.add('deactive');
    });
    this.chart.update();
    this.currentActiveIndex = highlightIndex;
  }

  removeHighlight(isHover: boolean = false) {
    if (isHover) {
      this.chart.setActiveElements([]);
      this.chart.tooltip?.setActiveElements([], { x: 0, y: 0 });
    }

    if (this.currentActiveIndex === undefined) return;

    (this.chart.data.datasets[0].hoverBackgroundColor as string[]).forEach((bgColor, i) => {
      (this.chart.data.datasets[0].backgroundColor as string[])[i] = bgColor;
      this.legendElements[i].classList.remove('deactive');
    });
    this.chart.update();
    this.currentActiveIndex = undefined;
  }
}
