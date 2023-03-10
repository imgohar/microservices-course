import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

console.clear();
stan.on('connect', async () => {
  console.log('Publisher connected to NATS');
  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '2323',
      title: 'gohar',
      price: 24,
    });
  } catch (error) {
    console.log(error);
  }

  // const data = JSON.stringify({
  //   id: '2323',
  //   title: 'gohar',
  //   price: 24,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('event  published');
  // });
});
