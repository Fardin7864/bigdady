import 'dotenv/config'

import express from 'express';
import configViewEngine from './config/configEngine.js';
import routes from './routes/web.js';
import cronJobContronler from './controllers/cronJobContronler.js';
import socketIoController from './controllers/socketIoController.js';
require('dotenv').config();

let cookieParser = require('cookie-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    transports: ['polling'],
  });

const port = process.env.PORT || 3000;
app.use(express.static('public'));

app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });
  
app.use(express.json());

// setup viewEngine
configViewEngine(app);
// init Web Routes
routes.initWebRouter(app);

// Cron game 1 Phut 
cronJobContronler.cronJobGame1p(io);

// Check xem ai connect vào sever 
socketIoController.sendMessageAdmin(io);

// app.all('*', (req, res) => {
//     return res.render("404.ejs"); 
// });

server.listen(port, () => {
    console.log("Connected success port: " + port);
});

server.on('error', (err) => {
    console.error('Server error:', err);
  });
  
  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
  });
  
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
  });
  