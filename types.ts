export interface GlobalState {
  konohaPercentage: number;
  activeSeals: number;
  protectedSeals: number;
  lastPopupTimestamp: number;
}

export enum Faction {
  Konoha = 'Konoha',
  Kirigakure = 'Kirigakure'
}