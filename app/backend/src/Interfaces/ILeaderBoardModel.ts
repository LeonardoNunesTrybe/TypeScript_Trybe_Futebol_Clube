import { ILeaderBoard } from './ILeaderBoard';

export interface ILeaderBoardModel {
  getTeams(): Promise<ILeaderBoard[]>
}
