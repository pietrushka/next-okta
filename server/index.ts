import express from "express";
import cors from "cors";
import { oktaAuthRequired } from "./oktaMiddleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = 4000;

app.get("/", oktaAuthRequired, (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
