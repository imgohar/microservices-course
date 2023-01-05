import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send({})
    .expect(404);
});

it('returns ticket if is not found', async () => {
  let title = 'test';
  let price = 20;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({})
    .expect(200);

  expect(ticketResponse.body.price).toEqual(price);
  expect(ticketResponse.body.title).toEqual(title);
});
