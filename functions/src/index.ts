import * as functions from "firebase-functions";
//import { Controller, Get } from '@nestjs/common';
import {NestFactory} from "@nestjs/core";
import {ExpressAdapter} from "@nestjs/platform-express";
import {AppModule} from "./app.module";
import express from "express";
const bodyParser = require('body-parser');

export * from "./functions/nlpTesting";
export * from "./functions/uploadFB";
export * from './functions/esOperations';
export * from "./functions/stripe";
export * from "./functions/jobs";

const server = express();

const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressInstance),
  );
  app.use(bodyParser.json({ type: 'application/json' }))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json({
    inflate: true,
    limit: '100kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined
  }))
  
  app.enableCors();

  return app.init();
};


createNestServer(server)
    .then((v) => console.log("Nest Ready"))
    .catch((err) => console.error("Nest broken", err));

export const api = functions.https.onRequest(server);



