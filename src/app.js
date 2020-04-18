import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes'
import config from './config'
import { initializeData } from './seed/user-seeder'





// Initialize app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
  res.json({app: 'Run app auth'});
});

// Connect to MongoDB
mongoose.connect(config.URI_MONGO, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
}).catch(err => console.log('Error: Could not connect to MongoDB.', err));

mongoose.connection.on('connected', () => {
  initializeData()
  console.log('Initialize user')
});
mongoose.connection.on('error', (err) => {
  console.log('Error: Could not connect to MongoDB.', err);
});

// Routes app
app.use('/', router);

// Start app
app.listen(config.PORT_LISTEN, () => {
  console.log('Listen port ' + config.PORT_LISTEN);
});