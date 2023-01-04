import { NotFound } from '@imgtickets/common';
import express, { Request, Response } from 'express';
const router = express.Router();
import { Ticket } from '../models/ticket';

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  if (!tickets) {
    throw new NotFound();
  }

  res.status(200).send(tickets);
});

export { router as indexTicketRouter };
