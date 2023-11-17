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
}
