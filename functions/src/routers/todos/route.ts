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
  todos: TodoType[];
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
  });

module.exports = router;
