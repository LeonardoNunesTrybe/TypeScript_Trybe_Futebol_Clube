import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return {
      status: 'SUCCESS',
      data: teams,
    };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Team with id ${id} not found` },
      };
    }
    return {
      status: 'SUCCESS',
      data: team,
    };
  }
}
