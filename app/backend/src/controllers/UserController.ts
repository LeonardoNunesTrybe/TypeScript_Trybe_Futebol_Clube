import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async findByEmail(req: Request, res: Response): Promise<Response> {
    const response = await this.userService.findByEmail(req.body);

    if (response.status === 'UNAUTHORIZED') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(200).json(response.data);
  }
}
