require('dotenv').config();
import express, { Request, Response, NextFunction, Application } from 'express';
const router = require('./routes/routes');
import cors from 'cors';

const port = process.env.PORT;

let app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, function ():void {
    console.log('Listening on port 3000!');
});