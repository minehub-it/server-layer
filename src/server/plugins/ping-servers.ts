import {tryPing} from "s/server/utils/utilServerPing";

export default defineNitroPlugin(async () => {
    console.log('🚀 Server ping system started')

    globalThis.serversCache = {}

    const isBuilding = import.meta.env.VITE_BUILDING === 'true'

    async function fetchServers() {
        try {
            console.log('🔄 Fetching server list from API...')
            const response = await $fetch('/api/servers')
            if (!response || response.status !== 200) throw new Error('Failed to fetch servers')
            console.log(`📡 Found ${response.servers.length} servers`)
            return response.servers
        } catch (err) {
            console.error('❌ Error fetching servers:', err)
            return []
        }
    }

    async function updateServersStatus() {
        let servers = await fetchServers()

        if (servers.length === 0) {
            console.warn('⚠ No servers found')
            if (!isBuilding) {
                console.warn('🔄 Retrying in 10 seconds...')
                return setTimeout(updateServersStatus, 10000)
            }
            return;
        }

        console.log('📡 Pinging servers...')

        const pings = servers.map(({address, platform}) => {
            platform = platform.includes('je') ? 'je' : 'be'

            return tryPing(platform, address)
                .then(serverPing => {
                    return {
                        address,
                        platform,
                        data: {
                            ...serverPing,
                            updatedAt: Date.now()
                        }
                    }
                })
                .catch(err => {
                    console.error(`❌ Ping failed for ${address} (${platform})`)
                    return {
                        address,
                        platform,
                        data: {
                            online: false,
                            players: 0,
                            slots: 0,
                            favicon: '',
                            updatedAt: Date.now()
                        }
                    }
                })
        })

        const results = await Promise.allSettled(pings)

        for (const result of results) {
            if (result.status === 'fulfilled') {
                const {address, data} = result.value

                globalThis.serversCache[address] = data
            }
        }

        console.log('✅ Server status updated')

        if (!isBuilding) {
            setTimeout(updateServersStatus, 60000)
        }
    }

    await updateServersStatus()
})
