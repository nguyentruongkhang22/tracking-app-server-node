import { WebSocketServer } from "ws";

const wss: WebSocketServer = new WebSocketServer({
  port: 3004,
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Hello, you sent => ${message}`);
  });
  ws.send("Hello, I am a server");
});
