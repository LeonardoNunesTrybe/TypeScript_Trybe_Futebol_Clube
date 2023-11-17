import { ServiceResponse } from '../Interfaces/ServiceResponse';
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
}
