import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

const PORT = process.env.PORT ? process.env.PORT : 8000;

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})


const MONGO_URL = "mongodb://127.0.0.1:27017/";
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/',router())

app.use('*',() => {
    console.log("page not found !!")
})