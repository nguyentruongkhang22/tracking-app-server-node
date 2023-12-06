import { EventEmitter } from "ws";

const eventHandler = new EventEmitter();

eventHandler.on("change", (data) => {
  console.log("change", data);
});

export { eventHandler };
