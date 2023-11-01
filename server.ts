import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import http from "http";

import "./database/config";
import "./common/websocket";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import { indexRouter } from "./routers/index.router";

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://www.lackadaisical.net"],
  credentials: true,
};

const middlewares = [cors(corsOptions), morgan("dev"), express.json(), helmet()];
const swaggerFile = require("./swagger_output.json");
const server = http.createServer(app);

app.use(middlewares);
app.use("/v1", indexRouter);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

server.listen(process.env.PORT || 3003, () => {
  console.log(`Server listening on port ${process.env.PORT || 3003}`);
});
