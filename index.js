const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
//const server = require('http').Server(app);
//const socket = require('socket.io');

const PORT = process.env.PORT || 5000;

// import Routes
const authRoute = require('./router/auth');
const postRoute = require('./router/posts');

//Connect to BD
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('Connect to BD')
);

//Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//const io = socket(server, {
//  cors: 'http://localhost:3000',
//  credentials: true,
//});

//io.on('connection', (socket) => {
//  console.log('user connected', socket.id);
//});
