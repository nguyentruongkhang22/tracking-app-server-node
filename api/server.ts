import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import http from "http";
import helmet from "helmet";
import path from "path";
import express from "express";
import morgan from "morgan";

import { Server } from "socket.io";
import { expressCspHeader } from "express-csp-header";
import { indexRouter } from "./routers/index.router";

import "./database/config";
import "./common/event";
import { decodeUser } from "./common/utils";
import { eventHandler } from "./common/event";

const app = express();

const middlewares = [
  morgan("dev"),
  express.json(),
  helmet(require("./config/helmetConfig.json")),
  expressCspHeader(require("./config/cspPolicies")),
  cors(require("./config/corsOptions")),
];

const swaggerFile = require("./swagger_output.json");
const server = http.createServer(app);

app.use(middlewares);
app.use("/v1", indexRouter);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));
app.use(express.static(path.join(__dirname, "dist")));

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

const io = new Server(server, { cors: { origin: "http://localhost:8080" } });

io.on("connection", (socket) => {
  console.log(" -- socket: ", socket.id);
  socket.on("validate", async (loginToken) => {
    const user = await decodeUser(loginToken);

    if (!user) {
      socket.disconnect();
    } else {
      user.socketId = socket.id;
      await user?.save();
    }
  });
});

eventHandler.on("updateTimeVariantData", (data) => {
  io.to(data.socketId).emit("updateTimeVariantData", data.timeVariantData);
});
