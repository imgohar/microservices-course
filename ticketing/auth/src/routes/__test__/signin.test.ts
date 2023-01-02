import request from 'supertest';
import { app } from '../../app';

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test',
      password: 'test',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@email.com',
      password: 'tes',
    })
    .expect(400);
});

it('fails when an email doesnot exists is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'testasssa',
    })
    .expect(400);
});

it('returns a 201 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);
});

it('respond with cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
