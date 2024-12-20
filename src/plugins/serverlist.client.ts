export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", async (a) => {
        const serverListStore = useServerListStore()
        const serverStorageStore = useServerStorageStore()

        if (import.meta.client) {
            await serverStorageStore.restore()
            await serverListStore.fetchPlayers()
        }
    })
});