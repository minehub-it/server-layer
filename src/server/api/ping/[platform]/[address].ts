import { serverQueryContent } from "#content/server";

export default defineEventHandler(async (event) => {
  if (!globalThis.serversCache) {
    return { status: 500, message: 'Cache not initialized' }
  }

  const address: string = getRouterParam(event, 'address') ?? '';

  const isServerValid = await serverQueryContent(event, `server/list`)
      .where({ address })
      .findOne()
      .then(serverFound => !!serverFound);

  if (!isServerValid) {
    return { status: 403, message: 'Server not in list' };
  }

  let result: ServerPingResult = {
    online: false,
    players: 0,
    slots: 0,
    favicon: undefined
  }

  if (globalThis.serversCache.hasOwnProperty(address)) {
    result = globalThis.serversCache[address]
  }

  return {
    status: 200,
    result
  };
});
