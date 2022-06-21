import express from "express";
import helmet from "helmet";
import cors from "cors";
import { authRouter } from "./routes/auth";

//Conf
const port = 4000;
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors);

//Routes
app.use(authRouter);

//Listen
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
