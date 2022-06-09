const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const socket = require('socket.io');
//const server = require('http').Server(app);
//const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

// import Routes
const authRoute = require('./router/auth');
const postRoute = require('./router/posts');
const usersRoute = require('./router/users');

//Connect to BD
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('Connect to BD')
);

//Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', usersRoute);

const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

const io = socket(server, {
  cors: {
    origin: 'https://spontaneous-dasik-8b09b3.netlify.app/',
    credentials: true,
    path: '/socket.io-client',
  },
});

const onlineUser = new Map();

io.on('connection', (socket) => {
  socket.on('add-user', (name) => {
    onlineUser.set(name, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUser.get(data.recepient);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', { data });
    }
  });
});
