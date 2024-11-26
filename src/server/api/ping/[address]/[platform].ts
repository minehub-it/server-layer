import {pingJava, pingBedrock} from '@minescope/mineping';

export default defineEventHandler(async (event) => {
    const address = getRouterParam(event, 'address')
    const platform = getRouterParam(event, 'platform')

    let ping
    let result = {}

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

    return result
})