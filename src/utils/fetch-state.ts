import { removePageLoader } from './dom';

const FETCH_FUNCTION_NAMES = [
  'clientPeopleHour',
  'clientTotalPlasticRemoved',
  'clientPlasticComposition',
  'clientProgressionOfPlasticRemoval',
] as const;

type FetchFunctionNameType = (typeof FETCH_FUNCTION_NAMES)[number];

const finishedFetchFunctions: Set<FetchFunctionNameType> = new Set();

export const setFinishedFetchFunctions = (functionName: FetchFunctionNameType) => {
  finishedFetchFunctions.add(functionName);
  if (finishedFetchFunctions.size !== FETCH_FUNCTION_NAMES.length) return;
  removePageLoader();
};
