import { IPlayer } from "./IPlayer";

export interface IGame {
  id:string;
  boardGame:string;
  players: IPlayer[];
}