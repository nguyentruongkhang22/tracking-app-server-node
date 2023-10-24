import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3004 });

wss.on('connection', function connection(ws, request) {
  authenticate(ws);

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

function authenticate(ws: WebSocket) {
  console.log(' -- ws: ', ws);
  // ws.protocols
}
