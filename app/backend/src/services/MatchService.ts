import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 'SUCCESSFULL', data: matches };
  }

  public async findByQuery(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByQuery(query);
    return { status: 'SUCCESSFULL', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFULL', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFULL', data: { message: 'Updated' } };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return { status: 'SUCCESSFULL', data: match };
  }
}
