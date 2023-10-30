import { WebSocketServer } from "ws";
import { server } from "../server";

const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  ws.on("message", function message(data: any) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
