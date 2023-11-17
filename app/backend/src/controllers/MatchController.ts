import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAll(_req: Request, res: Response) {
    const response = await this.matchService.findAll();
    res.status(200).json(response.data);
  }
}
