import io from "socket.io-client";

export class WsService {
  static socket = io();

  static init() {
    // client-side
    this.socket.on("connection", () => {
      console.log(" -- socket: ", this.socket);

      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on("data", () => {
      /* ... */
    });

    this.socket.emit("hello", "world", (response) => {
      console.log(response); // "got it"
    });

    this.socket.on("error", (error) => {
      console.log(error);
    });
  }
}

export default WsService;
