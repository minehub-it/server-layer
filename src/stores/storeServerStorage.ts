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
            serverListStore.servers = JSON.parse(storedServers)
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