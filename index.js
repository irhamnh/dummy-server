const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

var jsonParser = bodyParser.json();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST']
}

app.use(cors(corsOptions));
const port = 3030;


app.get('/request-otp', (req, res) => {
  if (req.query.user_id === '081234567890') {
    res.send({
      otp: '01234567'
    });
  } else {
    res.status(400);
    res.statusMessage = 'Failed to request OTP.';
    res.send('Failed to request OTP.');
  }
});

app.post('/validate-otp', jsonParser, (req, res) => {
  const { user_id, otp } = req.body;
  if (user_id === '081234567890' && otp === '012345') {
    res.send({
      authorization_code: '1117777'
    });
  } else {
    res.status(400);
    res.statusMessage = 'Failed to validate OTP.';
    res.send('Failed to validate OTP.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})