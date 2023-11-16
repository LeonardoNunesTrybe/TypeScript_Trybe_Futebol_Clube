import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamModel;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (team === null) {
      return null;
    }
    return team;
  }
}
