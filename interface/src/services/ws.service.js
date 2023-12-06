import io from "socket.io-client";
import MapService from "./map.service";
export class WsService {
  static socket = io.connect("http://localhost:3000");

  static initWs() {
    // client-side
    this.socket.on("connect", () => {
      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
      const loginToken = window.localStorage.getItem("login-token");

      this.socket.emit("validate", loginToken);
    });

    this.socket.on("error", (error) => {
      console.log(error);
    });

    this.socket.on("updateTimeVariantData", (data) => {
      console.log(data);
      MapService.setMarker([data.latitude, data.longitude]);
    });
  }

  static emit(event, data) {
    this.socket.emit(event, data);
  }
}

export default WsService;
