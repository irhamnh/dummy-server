const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const axios =require('axios');
var jsonParser = bodyParser.json();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST']
}

app.use(cors(corsOptions));
const port = 3030;

const baseUrl = 'http://localhost:8000';
const realmId = 'testing';

app.post(`/v1/${realmId}/otp/authenticate`, jsonParser, (req, res) => {
  const { user_id, scope, client_id, code_challenge, code_challenge_method, response_type, auth_client } = req.body;
  const { clientID, clientSecretKey } = req.header;

  axios.post(`${baseUrl}/v1/${realmId}/otp/authenticate`, {
    user_id, scope, client_id, code_challenge, code_challenge_method, response_type, auth_client
  }, {
    headers: {
      clientID,
      clientSecretKey
    }
  }).then((response) => {
    res.send({
      timestamp: response.data.timestamp
    })
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    res.status(400);
    res.send('Failed to request OTP.');
  });

});

app.post(`/v1/${realmId}/otp/authenticate/validate`, jsonParser, (req, res) => {
  const { user_id, otp } = req.body;
  const { clientID, clientSecretKey } = req.header;
  
  axios.post(`${baseUrl}/v1/${realmId}/otp/authenticate/validate`, {
    user_id, otp, client_id: clientID
  }, {
    headers: {
      clientID,
      clientSecretKey
    }
  }).then((response) => {
    res.send({
      auth_code: response.data.auth_code,
      timestamp: response.data.timestamp
    })
  }).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    res.status(400);
    res.send('Failed to request OTP.');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})