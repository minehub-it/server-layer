import { openDB } from "idb"

export const useServerStorageStore = defineStore('server/storage', () => {
    const serverListStore = useServerListStore()
    const storageName = 'server'
    const storageKey = 'list'

    async function dbPromise(){
        const dbPromise = openDB('minehub', 1, {
            upgrade(db) {
                db.createObjectStore(storageName);
            },
        })

        return dbPromise
    }

    async function restore() {
        const db = await dbPromise()

        const storedServers = await db.get(storageName, storageKey)

        if (storedServers) {
            let server

            for (const storedServer of JSON.parse(storedServers)) {
                server = serverListStore.servers.find(server => server.address === storedServer.address)

                if (server) {
                    server.online = storedServer.online
                    server.players = storedServer.players
                    server.slots = storedServer.slots
                    server.favicon = storedServer.favicon
                }
            }
        }
    }

    async function update() {
        const db = await dbPromise()

        await db.put(
            storageName,
            JSON.stringify(serverListStore.servers),
            storageKey
        )
    }

    return {
        restore,
        update,
    }
})