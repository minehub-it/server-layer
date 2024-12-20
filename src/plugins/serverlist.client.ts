export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", (a) => {
        const serverListStore = useServerListStore()
        const serverStorageStore = useServerStorageStore()

        callOnce(async () => {
            await serverStorageStore.restore()
            await serverListStore.fetchPlayers()
        })
    })
});