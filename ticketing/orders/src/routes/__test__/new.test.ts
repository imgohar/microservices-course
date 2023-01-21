import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '@imgtickets/common';
import { natsWrapper } from '../../nats-wrapper';

it('return an error if ticket does not exists', async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post('/api/orders')
    .set('Cookie', signin())
    .send({
      ticketId: ticketId,
    })
    .expect(404);
});

it('return an error if ticket is already reserved', async () => {
  const ticket = Ticket.build({
    title: 'Test',
    price: 20,
  });

  await ticket.save();

  const order = Order.build({
    ticket,
    userId: 'dsajdasjk',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticket = Ticket.build({
    title: 'Test',
    price: 20,
  });

  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);
});

it('emits an order created event', async () => {
  const ticket = Ticket.build({
    title: 'Test',
    price: 20,
  });

  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
