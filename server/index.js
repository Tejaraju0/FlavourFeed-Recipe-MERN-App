const express = require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const route = require('./routes/categoryRoute');
const session = require('express-session');
const flash = require('connect-flash');


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


app.use(session({
  secret: 'FlavourFeedSecretSession',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGODB_URI;

mongoose.connect(URL).then(() => {
  console.log("DB connected successfully");

  app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
  })
}).catch(error => console.log(error));

app.use('/api', route);
