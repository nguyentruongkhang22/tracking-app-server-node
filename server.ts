import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import {
  expressCspHeader,
  ExpressCSPParams,
  NONE,
  SELF,
} from "express-csp-header";

import "./database/config";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import { indexRouter } from "./routers/index.router";

const app = express();
const corsOptions = {
  origin: ["*"],
  credentials: true,
};

const cspPocicies = {
  directives: {
    "script-src": [
      SELF,
      "https://code.jquery.com/jquery-3.6.0.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js",
    ],
    "style-src": [
      SELF,
      "https://use.fontawesome.com/releases/v5.0.8/css/all.css",
      "https://fonts.googleapis.com/css/*",
      "https://fonts.googleapis.com/icon?family=Material+Icons",
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css",
      "https://use.fontawesome.com/releases/v5.0.8/webfonts/*",
      "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic",
    ],
    "img-src": [
      "*",
      "data:",
      "https://c.tile.osm.org/*",
      "https://*.tile.osm.org/*",
      "https://*.tile.osm.org/*/*/*.png",
      SELF,
    ],
    "worker-src": [NONE],
    "block-all-mixed-content": true,
    "upgrade-insecure-requests": true,
  },
};

const middlewares = [
  cors(corsOptions),
  morgan("dev"),
  express.json(),
  helmet({
    contentSecurityPolicy: false,
  }),
  expressCspHeader(cspPocicies),
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

const io = new Server(server);

// WEBSOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("WEBSOCKET Connected 💯 💯 💯");
  socket.on("change", (deviceStatus) => {
    console.log(`${deviceStatus ? "on" : "off"}`);
  });

  socket.on("patch", async (statusChange, deviceId) => {
    console.log(statusChange, deviceId);
    socket.broadcast.emit(
      "sendFromDevice",
      statusChange.deviceStatus,
      deviceId
    );
  });
});
