import { Namespace, Socket } from "socket.io";
import { messageUserInterface } from "../interfaces/messageInterface";
import { FailureMiddleware } from "../inc/failureMiddleware";
import { checkUser, getSocketId } from "../inc/caching";
import { io } from "../router/server";

export default function roomStore(
  event: string,
  args: Array<messageUserInterface>,
  messaging: Namespace,
  socket: Socket,
  next: (err?: Error) => void
) {
  try {
    const receiver = args[0]?.receiver;
    if (isReceiverOnline(receiver)) {
      const setMap = new Set<string>();
      setMap.add(socket.id);
      setMap.add(String(getSocketId(receiver)));
      messaging.adapter.rooms.set("testRoom", setMap);
    }
    next();
  } catch (e) {
    next(new FailureMiddleware("NO_AUTH").error());
  }
}

function isReceiverOnline(receiver: string): boolean {
  return checkUser(receiver);
}

function createRoom() {}
