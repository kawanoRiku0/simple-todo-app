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
    try {
      // 一時的に型any
      const querySnapshot: any = await db
        .collection("todos")
        .orderBy("createdAt", "asc")
        .get();

      const todos: TodoType[] = querySnapshot.docs.map((doc: Doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return res.status(200).json({ todos });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: "取得失敗" });
    }
  })
  .post(async (req: express.Request, res: express.Response<Json>) => {
    const value: string = req.body.value;
    const createdAt = new Date().toISOString();
    try {
      // 一時的にany
      if (!value) {
        // eslint-disable-next-line no-throw-literal
        throw "it is empty!";
      }
      await db.collection("todos").add({ value, createdAt });
      const message = "作成成功";

      return res.json({ message });
    } catch (e) {
      let error = "";
      console.error(e);
      if (e === "it is empty!") {
        error = "中身が空です";
      } else {
        error = "作成失敗";
      }

      return res.json({ error });
    }
  });

router
  .route(`${endPoint}/:id`)
  .delete(async (req: express.Request, res: express.Response<Json>) => {
    const id: string = req.params.id;
    try {
      await db.collection("todos").doc(id).delete();
      const message = "削除成功";
      return res.json({ message });
    } catch (e) {
      console.error(e);
      const error = "削除失敗";
      return res.json({ error });
    }
  });

module.exports = router;
