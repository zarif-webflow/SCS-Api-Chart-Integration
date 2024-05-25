// SevenCleanSeas.d.ts

declare namespace SevenCleanSeasAPI {
  interface RequestPayload {
    [key: string]: unknown;
  }

  interface ResponseResult {
    result: unknown;
  }

  interface PlasticCompositionResponse {
    [key: string]: unknown;
  }

  interface TopTeamsResponse {
    [key: string]: unknown;
  }

  interface TopographyResponse {
    [key: string]: unknown;
  }

  interface CollectionActivitiesResponse {
    [key: string]: unknown;
  }
}

declare class SevenCleanSeas {
  constructor(apiToken: string, isClient: 0 | 1, clientId?: number);

  private createHeaders(apiToken: string, isClient: 0 | 1, clientId?: number): HeadersInit;
  private sendRequest<T>(endpoint: string, payload: SevenCleanSeasAPI.RequestPayload): Promise<T>;

  scsPeopleHour({ clientId, year }: { clientId: number; year: number }): Promise<number>;

  scsTotalPlasticRemoved(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.PlasticCompositionResponse>;
  scsPlasticComposition(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.PlasticCompositionResponse>;
  scsTopTeams(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.TopTeamsResponse>;
  scsTopography(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.TopographyResponse>;
  scsCollectionActivities(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.CollectionActivitiesResponse>;

  clientPeopleHour({ clientId, year }: { clientId: number; year: number }): Promise<[number]>;
  clientTotalPlasticRemoved({
    clientId,
    year,
  }: {
    clientId: number;
    year: number;
  }): Promise<[number]>;
  clientPlasticComposition({
    clientId,
    year,
  }: {
    clientId: number;
    year: number;
  }): Promise<{ materialTypeName: string; weightKgRev: number; chartColorCustom: string }[]>;
  clientProgressionOfPlasticRemoval({
    clientId,
    year,
  }: {
    clientId: number;
    year: number;
  }): Promise<
    { year: number; month_No: number; yearMonth: string; totalPlasticRemovalKg: number }[]
  >;
  clientTopTeams(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.TopTeamsResponse>;
  clientTopography(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.TopographyResponse>;
  clientCollectionActivities(
    payload: SevenCleanSeasAPI.RequestPayload
  ): Promise<SevenCleanSeasAPI.CollectionActivitiesResponse>;
}
