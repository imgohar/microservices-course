import express, { Request, Response } from 'express';
const router = express.Router();
import { currentUser } from '@imgtickets/common';

router.get(
  '/api/users/currentuser',
  currentUser,
  async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
