import express from "express";
import cors from 'cors';
import { routes } from "./routes";
import { initializeDbConnection } from "./db";

const PORT = process.env.PORT || 8080;

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

initializeDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
