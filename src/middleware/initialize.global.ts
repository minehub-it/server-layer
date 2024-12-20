export default defineNuxtRouteMiddleware(async to => {
    const serverListStore = useServerListStore()
    const serverCategoryStore = useServerCategoryStore()

    callOnce(async () => {
            await serverCategoryStore.initialize()
            await serverListStore.fetchFromContent()
    })
})