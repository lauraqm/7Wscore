export interface IScoreCard {
  id: string;
  player: string;
  scores: {
    civilian:number;
    coins:number;
    commercial:number;
    guild:number;
    military:number;
    progress:number;
    scientific:number;
    total:number;
    wonders: number;
  };
}