const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('./routes');
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.send('¡Servidor de Estacionamiento en funcionamiento!');
});

module.exports = app;