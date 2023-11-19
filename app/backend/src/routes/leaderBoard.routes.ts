import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const boardController = new LeaderBoardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => boardController.getHomeTable(req, res));
router.get('/away', (req: Request, res: Response) => boardController.getAwayTable(req, res));

export default router;
