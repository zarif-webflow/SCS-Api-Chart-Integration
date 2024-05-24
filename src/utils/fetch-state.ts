import { removePageLoader } from './dom';

const FETCH_FUNCTION_NAMES = [
  'clientPeopleHour',
  'clientTotalPlasticRemoved',
  'clientPlasticComposition',
] as const;

type FetchFunctionNameType = (typeof FETCH_FUNCTION_NAMES)[number];

const finishedFetchFunctions: FetchFunctionNameType[] = [];

export const setFinishedFetchFunctions = (functionName: FetchFunctionNameType) => {
  finishedFetchFunctions.push(functionName);
  if (finishedFetchFunctions.length === FETCH_FUNCTION_NAMES.length) {
    removePageLoader();
  }
};
