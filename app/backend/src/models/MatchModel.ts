import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { IMatch } from '../Interfaces/IMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll();
    return matches;
  }
}
