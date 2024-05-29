// SevenCleanSeas.d.ts

declare class SevenCleanSeas {
  constructor(apiToken: string, isClient: 0 | 1, clientId?: number);

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
}
