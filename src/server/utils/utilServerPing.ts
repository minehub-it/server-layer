import {pingBedrock, pingJava} from "@minescope/mineping";

export async function pingMcsrvstat(platform: string, address: string) {
    const url = platform === 'je'
        ? `https://api.mcsrvstat.us/2/${address}`
        : `https://api.mcsrvstat.us/bedrock/${address}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to fetch from mcsrvstat.us: ${address}`)
    }

    return response.json()
}

export async function tryPing(platform: string, address: string): Promise<ServerPingResult> {
    if (platform === 'je') {
        try {
            const data = await pingMcsrvstat(platform, address)

            return {
                online: data.debug.ping,
                players: data.players.online,
                slots: data.players.max,
                favicon: data.icon,
            }
        } catch {
            const data = await pingJava(address)

            return {
                online: true,
                players: data.players.online,
                slots: data.players.max,
                favicon: data.favicon,
            }
        }
    } else if (platform === 'be') {
        try {
            const data = await pingMcsrvstat(platform, address)

            return {
                online: data.debug.ping,
                players: data.players,
                favicon: data.icon,
            }
        } catch {
            const data = await pingBedrock(address)

            return {
                online: true,
                players: data.players.online,
                slots: data.players.max,
            }
        }
    }
    throw new Error(`Invalid platform: ${platform}`)
}
