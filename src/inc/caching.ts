import NodeCache from "node-cache";

const cacheObj = new NodeCache();
export async function setSocketId(userName: string, socketId: string) {
  // TODO add a type (group, chanel , user) to the value
  cacheObj.set<string>(userName, socketId);
}

export async function getSocketId(
  userName: string
): Promise<string | undefined> {
  return cacheObj.get(userName);
}

export function deleteSocketId(auth: any) {
  try {
    const userName = JSON.parse(auth).user_name;
    cacheObj.del(userName);
  } catch {}
}
