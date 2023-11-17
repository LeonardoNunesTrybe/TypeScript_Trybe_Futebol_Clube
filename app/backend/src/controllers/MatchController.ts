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

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchService.finishMatch(Number(id));
    res.status(200).json(response.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.updateMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(200).json(response.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(response.data);
  }
}
