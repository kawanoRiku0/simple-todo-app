/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint linebreak-style: ["error", "windows"] */
import express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("../../../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// eslint-disable-next-line new-cap
const router = express.Router();

const endPoint = "/todos";

type TodoType = {
  readonly id: number;
  value: string;
};

type Doc = {
  data: () => TodoType[];
  id: string;
};

type Json = {
  todos?: TodoType[];
  message?: string;
  error?: string;
};

router
  .route(endPoint)
  .get(async (req: express.Request, res: express.Response<Json>) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    try {
      // 一時的に型any
      const querySnapshot: any = await db.collection("todos").get();

      const todos: TodoType[] = querySnapshot.docs.map((doc: Doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      res.json({ todos });
    } catch (e) {
      console.error(e);
    }
  })
  .post(async (req: express.Request, res: express.Response<Json>) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    const value: string = req.body.value;

    let error = "";
    let message = "";

    try {
      // 一時的にany
      if (!value) {
        // eslint-disable-next-line no-throw-literal
        throw "it is empty!";
      }
      await db.collection("todos").add({ value });
      message = "作成成功";
    } catch (e) {
      console.error(typeof e);
      if (e === "it is empty!") {
        error = "中身が空です";
      } else {
        error = "作成失敗";
      }
    }
    res.json({ message, error });
  });

module.exports = router;
