export default defineNuxtRouteMiddleware(async to => {
    const serverListStore = useServerListStore()
    const serverCategoryStore = useServerCategoryStore()

    if (serverListStore.servers.length === 0) {
        await serverCategoryStore.initialize()
        await serverListStore.fetchFromContent()
    }
})