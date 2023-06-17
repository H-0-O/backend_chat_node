import { getSocketId } from "../inc/caching";
import { messageUserInterface } from "../interfaces/messageInterface";
import { io } from "./../router/server";
export async function newMessage(data: messageUserInterface) {
  // TODO validation to field that sends from user
  const toSocketId: string | undefined = await getSocketId(data.to);
  if (toSocketId) {
    io.to(toSocketId).emit("newMessage", data.text);
  }
}
