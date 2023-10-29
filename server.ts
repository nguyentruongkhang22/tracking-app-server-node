import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import http from "http";

import "./common/websocket";
import "./database/config";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import { indexRouter } from "./routers/index.router";

const app = express();
const middlewares = [cors({ credentials: true, origin: "http://localhost:3000" }), morgan("dev"), express.json(), helmet()];
const swaggerFile = require("./swagger_output.json");
const server = http.createServer(app);

app.use(middlewares);
app.use("/v1", indexRouter);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

server.listen(process.env.PORT || 3003, () => {
  console.log(`Server listening on port ${process.env.PORT || 3003}`);
});
