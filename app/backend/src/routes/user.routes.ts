import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.findByEmail(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.roleLogin(req, res),
);

export default router;
