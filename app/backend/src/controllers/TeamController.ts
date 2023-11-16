import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async findAll(_req: Request, res: Response) {
    const response = await this.teamService.findAll();
    res.status(200).json(response.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.teamService.findById(Number(id));
    if (response.status === 'NOT_FOUND') {
      res.status(404).json(response.data);
      return;
    }
    res.status(200).json(response.data);
  }
}
