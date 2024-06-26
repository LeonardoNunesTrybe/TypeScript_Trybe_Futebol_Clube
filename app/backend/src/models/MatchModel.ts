import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { IMatch } from '../Interfaces/IMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [{
        all: true,
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  }

  async findByQuery(query: string): Promise<IMatch[]> {
    if (query === 'true') {
      const matches = await this.model.findAll({
        where: { inProgress: true },
        include: [{ all: true, attributes: { exclude: ['id'] } }],
      });
      return matches;
    }
    if (query === 'false') {
      const matches = await this.model.findAll({
        where: { inProgress: false },
        include: [{ all: true, attributes: { exclude: ['id'] } }],
      });
      return matches;
    }
    return this.findAll();
  }

  async finishMatch(id: IMatch['id']): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(
    id: IMatch['id'],
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(
    homeTeamId: IMatch['homeTeamId'],
    awayTeamId: IMatch['awayTeamId'],
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): Promise<IMatch> {
    const response = await this.model.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return response;
  }
}
