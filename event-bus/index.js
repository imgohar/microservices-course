const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
    const events = req.body;
    axios.post('http://localhost:4000/events', {
        events,
    });
    axios.post('http://localhost:4001/events', {
        events,
    });
    axios.post('http://localhost:4002/events', {
        events,
    });
    res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('Posts server is spinning on port 4005');
});
