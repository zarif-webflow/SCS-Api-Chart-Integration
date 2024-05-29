import Color from 'color';

import { FALLBACK_COLOR } from './constants';

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

export const wait = async (delayInMs: number) => new Promise((res) => setTimeout(res, delayInMs));

export const parseColorString = (colorString: string) => {
  try {
    return Color(colorString);
  } catch (err) {
    return Color(FALLBACK_COLOR);
  }
};
