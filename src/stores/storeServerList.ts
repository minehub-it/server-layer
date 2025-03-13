export const useServerListStore = defineStore('server/list', () => {
    const serverPingStore = useServerPingStore()
    const serverCategoryStore = useServerCategoryStore()
    const serverFilterStore = useServerFilterStore()
    const serverFavoriteStore = useServerFavoriteStore()
    const servers: Ref<IServer[]> = ref([])

    async function fetchFromContent() {
        const queryContentKey = `/server/list`

        await useAsyncData(queryContentKey, async () => {
            servers.value = await queryContent(queryContentKey)
                .find()
                .then(servers => {
                    return servers.map(server => {

                        // filter categories by known categories
                        server.categories = server.categories.filter(category => {
                            return serverCategoryStore.categoriesSlug.includes(category.toLowerCase())
                        })

                        // prepare server keywords
                        server.keywords = server.name + ' ' + server.address + ' ' + server.categories.join(' ')

                        return server
                    })
                })
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
    }

    const list = computed(() => {
        //let tmpList = servers.value[filters.platform].list

        let tmpList = servers.value
            .filter(server => server.slug !== '')
            .filter(server => server.online === true)

        // filter by favorite
        if (serverFilterStore.filters.favorite) {
            tmpList = tmpList.filter(server => {
                return serverFavoriteStore.favorites.includes(server.address)
            })
        }

        // filter by platform
        if (serverFilterStore.filters.platform) {
            tmpList = tmpList.filter(server => server.platform.includes(serverFilterStore.filters.platform))
        }

        // filter by category
        if (serverFilterStore.filters.category !== null) {
            tmpList = tmpList.filter(server => server.categories.includes(serverFilterStore.filters.category))
        }

        // filter by keyword
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
            sortBy = 'random'
            sortDesc = true
        }

        // sort by
        if (sortBy === 'random') {
            tmpList = tmpList.sort(() => Math.random() - 0.5);
        } else {
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