import functions = require("firebase-functions");
const cors = require("cors");
import express = require("express");
import { CorsOptions } from "cors";

const todosRouter = require("./routers/todos/route");

const app = express();

const allowedOrigins = ["http://localhost:3000"];
const options: CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use("/", todosRouter);

exports.api = functions.region("asia-northeast2").https.onRequest(app);
