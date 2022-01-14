const functions = require("firebase-functions");
import express = require("express");
const todosRouter = require("./routers/todos/route");

const app = express();
app.use("/", todosRouter);

exports.api = functions.region("asia-northeast2").https.onRequest(app);
