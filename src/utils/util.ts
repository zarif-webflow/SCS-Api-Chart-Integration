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

export function idToRegex(id: string) {
  const words = id.split('-');
  const regexParts = words.map((word) => `\\b${word}s?\\b|\\b${word.replace(/s$/, '')}\\b`);
  if (words.length === 1) {
    // Match a single word, allowing for plural forms
    return new RegExp(regexParts[0], 'i');
  }
  // Match at least two words from the id, allowing for plural or singular forms
  return new RegExp(`(?=.*(${regexParts[0]}))(?=.*(${regexParts[1]}))`, 'i');
}

export function matchIdWithText(id: string, text: string) {
  const pattern = idToRegex(id);
  return pattern.test(text);
}
