import { assertValue } from './util';

export const clientId = Number.parseInt(
  assertValue(document.body.dataset.clientId, "Can't find data-client-id on body!")
);
export const apiToken = assertValue(
  document.body.dataset.apiToken,
  "Can't find data-api-token on body!"
);
export const isAdmin = document.body.dataset.isAdmin;

export const scsClient =
  isAdmin === 'false' ? new SevenCleanSeas(apiToken, 1, clientId) : new SevenCleanSeas(apiToken, 0);
