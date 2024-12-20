import {pingJava, pingBedrock} from '@minescope/mineping';
import {serverQueryContent} from "#content/server";

const serversCache: {[key: string]: any} = {}

export default defineEventHandler(async (event) => {
    const address: string = getRouterParam(event, 'address') ?? ''
    const platform: string = getRouterParam(event, 'platform') ?? ''

    if (!address || !platform) {
        return { status: 403, message: 'Invalid server address' }
    }

    const isServerValid = await serverQueryContent(event, `server/list`)
        .where({ address })
        .findOne()
        .then(serverFound => !!serverFound)

    if (!isServerValid) {
        return { status: 403, message: 'Server not in list' }
    }

    if (serversCache.hasOwnProperty(address)) {
        if (Date.now() - serversCache[address].updatedAt < 60000) {
            return serversCache[address]
        }
    }

    let ping
    let result: any = {
        updatedAt: new Date(),
    }

    switch (platform) {
        case 'je':
            ping = pingJava(address)
            break
        case 'be':
            ping = pingBedrock(address)
            break
    }

    await ping
        .then((serverPing) => {
            result.online = true
            result.players = serverPing.players.online
            result.slots = serverPing.players.max
            result.favicon = serverPing.favicon
        })
        .catch(() => {
            result.online = false
            result.players = 0
        })

    serversCache[address] = result

    return {
        status: 200,
        result
    }
})