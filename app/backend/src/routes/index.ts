import { Router } from 'express';
import teamsRouter from './TeamRoute';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
