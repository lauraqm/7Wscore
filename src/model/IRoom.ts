import { IPlayer } from "./IPlayer";

export interface IRoom {
  id: string;
  boardGame: string;
  players: IPlayer[];
}