require('dotenv').config();
require('./middlewares/sequelize');
import express, { Request, Response, NextFunction, Application } from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerDoc from './swagger.json';
import { RegisterRoutes } from "./routes";
import { ValidateError } from "tsoa";
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const port = process.env.PORT;

let app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas Swagger
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, undefined)
  );

// Registra rotas
RegisterRoutes(app);

app.use(function handleErrors (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof errorHandler) {
    let error = (err as errorHandler);
    console.warn(`Caught Error for ${req.path}: ${error.getInfo}`);
    return res.status(error.getReturnCode()).json({
      message: error.getType(),
      details: error.getInfo(),
    });
  }
  if (err instanceof Error) {
    console.warn(`Caught Error for ${req.path}: ${err.toString()}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

app.listen(port, function ():void {
    console.log('Listening on port 3000!');
});