import { NotFound } from '@imgtickets/common';
import express, { Request, Response } from 'express';
const router = express.Router();
import { Ticket } from '../models/ticket';

router.post('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFound();
  }

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
