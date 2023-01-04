import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';
import {
  validateRequest,
  BadRequestError,
  requireAuth,
} from '@imgtickets/common';

router.post(
  '/api/tickets',
  requireAuth,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
