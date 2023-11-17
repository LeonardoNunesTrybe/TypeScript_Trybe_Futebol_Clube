import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(query: string): Promise<IMatch[]>;
  finishMatch(id: IMatch['id']): Promise<void>;
  updateMatch(
    id: IMatch['id'],
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): Promise<void>;
}
