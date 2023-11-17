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

  public async findByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchService.findByQuery(inProgress as string);
    res.status(200).json(response.data);
  }
}
