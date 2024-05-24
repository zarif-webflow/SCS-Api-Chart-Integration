import { assertValue } from './util';

export const clientId = Number.parseInt(
  assertValue(document.body.dataset.clientId, "Can't find data-client-id on body!")
);
export const apiToken = assertValue(
  document.body.dataset.apiToken,
  "Can't find data-api-token on body!"
);

export const scsClient = new SevenCleanSeas(apiToken, 1, clientId);
