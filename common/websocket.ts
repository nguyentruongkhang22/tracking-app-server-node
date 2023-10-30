import { wss } from "../server";
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Hello, you sent => ${message}`);
  });
  ws.send("Hello, I am a server");
});
