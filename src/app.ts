import express from 'express';
import getOzone from "./ozone_bot/bot";
import initializeEgo from "./ozone_bot/ego";
import {initializeDatabase} from "./models/mongodb";

const app = express();
const port = 3000; 
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!!@');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  initializeDatabase();
  

  // Initialize bot
  // const ozone = getOzone();
  // initializeEgo(ozone);
  return console.log(`server is listening on ${port}`);
});