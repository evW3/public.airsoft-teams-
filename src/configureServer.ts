import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { defaultRoutes } from './providers/root';
import { errorMiddleware } from "./middleware/error";
import { loggerMiddleware } from "./middleware/logger";

const app: express.Application = express();

// const http = require('http').Server(app);
// const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(cors());

app.use(loggerMiddleware);
app.use('/api', defaultRoutes);

// io.on('connection', function(sock: any) {
//     console.log('connect');
// });

// io.of("/api/notification").on('connection', (sock: any) => {
//     console.log('connect');
//     sock.on('disconnect', () => {
//         console.log('disconnect');
//     })
// });

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/*', (_: any, res: express.Response) => res.status(404).json({ message: 'Route not found' }));
app.use(errorMiddleware);

export { app };