import { pingJava, pingBedrock } from '@minescope/mineping';
import { serverQueryContent } from "#content/server";

const serversCache: { [key: string]: any } = {};

async function pingWithRetry(
  pingFn: (address: string) => Promise<any>,
  address: string,
  retries: number = 2
): Promise<any> {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await pingFn(address);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

async function tryPing(platform: string, address: string): Promise<any> {
  if (platform === 'je') {
    try {
      return await pingWithRetry(pingJava, address, 2);
    } catch (err) {
      return await pingBedrock(address);
    }
  } else if (platform === 'be') {
    try {
      return await pingWithRetry(pingBedrock, address, 2);
    } catch (err) {
      return await pingJava(address);
    }
  }
  throw new Error('Invalid platform');
}

export default defineEventHandler(async (event) => {
  const address: string = getRouterParam(event, 'address') ?? '';
  const platform: string = getRouterParam(event, 'platform') ?? '';

  if (!address || !platform) {
    return { status: 403, message: 'Invalid server address' };
  }

  const isServerValid = await serverQueryContent(event, `server/list`)
    .where({ address })
    .findOne()
    .then(serverFound => !!serverFound);

  if (!isServerValid) {
    return { status: 403, message: 'Server not in list' };
  }

  if (serversCache.hasOwnProperty(address)) {
    if (Date.now() - serversCache[address].updatedAt < 20000) {
      return serversCache[address];
    }
  }

  let result: any = {
    updatedAt: new Date(),
  };

  serversCache[address] = result;

  try {
    const serverPing = await tryPing(platform, address);
    result.online = true;
    result.players = serverPing.players.online;
    result.slots = serverPing.players.max;
    result.favicon = serverPing.favicon;
  } catch (err) {
    result.online = false;
    result.players = 0;
  }

  serversCache[address] = result;

  return {
    status: 200,
    result,
  };
});
