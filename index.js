const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('./router');
const app = express();
const port = 3000;

const corsOptions = {
    origin: '*'
}

// parse application/json
app.use(bodyParser.json())

app.use(cors(corsOptions));

app.use('/', router);


var admin = require("firebase-admin");

var serviceAccount = require("./private-config/firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})