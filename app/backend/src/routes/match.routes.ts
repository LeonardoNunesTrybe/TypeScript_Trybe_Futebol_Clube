import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.query) {
    return matchController.findByQuery(req, res);
  }
  return matchController.findAll(req, res);
});

router.patch('/:id/finish', Validations.validateToken, (req: Request, res: Response) => {
  matchController.finishMatch(req, res);
});

router.patch('/:id', Validations.validateToken, (req: Request, res: Response) => {
  matchController.updateMatch(req, res);
});

export default router;
