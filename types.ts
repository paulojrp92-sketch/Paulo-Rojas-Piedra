export interface GlobalState {
  konohaPercentage: number;
  activeSeals: number;
  protectedSeals: number;
  isPopupOpen: boolean;
}

export enum Faction {
  Konoha = 'Konoha',
  Kirigakure = 'Kirigakure'
}