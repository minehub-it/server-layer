export const useServerListStore = defineStore('server/list', () => {
    const serverPingStore = useServerPingStore()
    const serverFilterStore = useServerFilterStore()
    const serverFavoriteStore = useServerFavoriteStore()
    const serverStorageStore = useServerStorageStore()
    const servers: Ref<IServer[]> = ref([])

    async function fetchFromContent() {
        if (servers.value.length > 0) {
            return true
        }

        const queryContentKey = `/server/list`

        await useAsyncData(queryContentKey, async () => {
            servers.value = await queryContent(queryContentKey).find()
            return true
        })
    }

    function updateServerByProperty(serverFindKey: string, serverFindValue: string, properties: any) {
        let server = servers.value.find(s => {
            return s[serverFindKey] === serverFindValue
        })

        if (server) {
            for (let propertyKey of Object.keys(properties)) {
                server[propertyKey] = properties[propertyKey]
            }
        }

        serverStorageStore.update()
    }

    const list = computed(() => {
        //let tmpList = servers.value[filters.platform].list

        let tmpList = servers.value
            .filter(server => server.slug !== '')
            .filter(server => server.online === true)

        if (serverFilterStore.filters.favorite) {
            tmpList = tmpList.filter(server => {
                return serverFavoriteStore.favorites.includes(server.address)
            })
        }

        if (serverFilterStore.filters.platform) {
            tmpList = tmpList.filter(server => server.platform.includes(serverFilterStore.filters.platform))
        }

        if (serverFilterStore.filters.category === 'premium') {
            //tmpList = []
            tmpList = tmpList.filter(server => server.premium === true)
        } else if (serverFilterStore.filters.category !== null) {
            //tmpList = []
            tmpList = tmpList.filter(server => server.categories.includes(serverFilterStore.filters.category))
        }

        if (serverFilterStore.filters.keyword) {
            tmpList = tmpList.filter(server => {
                return (
                    server.keywords.toLowerCase().includes(serverFilterStore.filters.keyword.toLowerCase())
                )
            })
        }

        let sortBy: string = ''
        let sortDesc: boolean = false

        if (!serverFilterStore.orders) {
            return []
        }

        if (serverFilterStore.orders.name) {
            sortBy = 'name'
            sortDesc = serverFilterStore.orders.name === 'az'
        } else if (serverFilterStore.orders.players) {
            sortBy = 'players'
            sortDesc = serverFilterStore.orders.players === 'az'
        } else {
            sortBy = 'position'
            sortDesc = true
        }

        // ordina per sortBy
        if (sortBy) {
            tmpList = tmpList.sort((a, b) => {
                const sortA = a[sortBy]
                const sortB = b[sortBy]

                if (serverFavoriteStore.favorites.includes(a.address)) {
                    return -1
                }

                // poi ordina in base a ordine della tabella (preferenze utente)
                if (sortDesc) {
                    if (sortB < sortA) return 1
                    if (sortB > sortA) return -1
                    return 0
                } else {
                    if (sortB < sortA) return -1
                    if (sortB > sortA) return 1
                    return 0
                }
            })
        }

        return tmpList
    })

    async function fetchPlayers() {
        await serverPingStore.pingServers(servers.value)

        setTimeout(fetchPlayers, 15000);
    }

    return {
        servers,
        list,
        fetchFromContent,
        fetchPlayers,
        updateServerByProperty,
    }
})