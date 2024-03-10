// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const players = require('./routes/api/players');
const schedules = require('./routes/api/schedules');
const coaches = require('./routes/api/coaches');
const sheets = require('./routes/api/sheets');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware

app.use(express.json({limit: "30mb",extended:false}));

app.use(express.urlencoded({limit: "30mb",extended:false}));


app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/players', players);
app.use('/api/schedules', schedules);
app.use('/api/coaches', coaches);
app.use('/api/sheets', sheets);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
