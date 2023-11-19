import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async getHomeTable(req: Request, res: Response) {
    const response = await this.leaderBoardService.getHomeTable();
    res.status(200).json(response.data);
  }
}
