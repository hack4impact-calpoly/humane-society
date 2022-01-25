const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var signup = require('./signup')
var login = require('./login')
var login = require('./availability')

app.use('/signup', signup)
app.use('/login', login)
app.use('/availability', UpdateAvailability)

app.get('/', (req, res) => {
  res.send('Hi from Woods Humane Society!');
});

app.listen(3001);
