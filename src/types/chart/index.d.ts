import { Plugin } from 'chart.js';

interface CustomDoughnutLegendOptions {
  unit: string;
  inactiveColors: string[];
}

declare module 'chart.js' {
  interface PluginOptionsByType<> {
    customDoughnutLegend?: CustomDoughnutLegendOptions;
  }
}

declare const plugin: Plugin;

export * from './context';

export default plugin;
