const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const eventsArr = [];

app.post('/events', (req, res) => {
  const events = req.body;

  eventsArr.push(events);

  axios.post('http://localhost:4000/events', {
    events,
  });
  axios.post('http://localhost:4001/events', {
    events,
  });
  axios.post('http://localhost:4002/events', {
    events,
  });
  axios.post('http://localhost:4003/events', {
    events,
  });
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(eventsArr);
});

app.listen(4005, () => {
  console.log('Posts server is spinning on port 4005');
});
