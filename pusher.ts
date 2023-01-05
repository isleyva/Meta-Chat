import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1533964",
  key: "e134df46841481cc4030",
  secret: process.env.SECRET_KEY!,
  cluster: "eu",
  useTLS: true,
});

export const clientPusher = new ClientPusher("e134df46841481cc4030", {
  cluster: "eu",
});
