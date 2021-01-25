"use strict";

import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import morgan from "morgan";
//***********************Database Connection SECTION Starts FROM HERE***********************
import dbConnection from "./app/components/db_connection/index.js";
//***********************Database Connection SECTION EndS FROM HERE***********************
//***********************API'S SECTION STARTS FROM HERE***********************
import formRouter from "./app/components/form/formRoutes.js";
import competationRouter from "./app/components/form/competation/competationRoutes.js";
//***********************API'S SECTION EndS FROM HERE***********************
const app = express();
import path from "path";
// app.use(morgan("dev"));
const __dirname = path.resolve();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", [formRouter, competationRouter]);
app.use(
  cors({
    origin: process.env.origin,
    credentials: true,
  })
);

// app.use(express.static('UITemporary'));

// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, './UITemporary/index.html'));
// });

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

let port = process.env.PORT || 4000;

app
  .listen(port, function () {
    console.log(`🚀 Server on http://localhost:${port}/`);
  })
  .on("error", function (error) {
    console.log(error);
  });
