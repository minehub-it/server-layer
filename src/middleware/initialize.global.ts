export default defineNuxtRouteMiddleware(async to => {
    const serverListStore = useServerListStore()
    const serverStorageStore = useServerStorageStore()
    const serverCategoryStore = useServerCategoryStore()

    if (serverListStore.servers.length === 0) {
        await serverCategoryStore.initialize()
        await serverListStore.fetchFromContent()
    }

    if (import.meta.client) {
        await serverStorageStore.restore()
        await serverListStore.fetchPlayers()
    }
})