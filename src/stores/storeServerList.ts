import api from "~/api";

export const useServerListStore = defineStore('server/list', () => {
  const serverFilterStore = useServerFilterStore()
  const servers: Ref<IServer[]> = ref([])

  async function initialize() {
    const queryContentKey = `/server/list`

    await useAsyncData(queryContentKey, async () => {
      const document = await queryContent(queryContentKey).find()

      servers.value = document
    })

    return true
  }

  const list = computed(() => {
    if (!serverFilterStore.filters.platform) {
      return []
    }

    //let tmpList = servers.value[filters.platform].list

    let tmpList = servers.value
        .filter(server => server.slug !== '')
        //.filter(server => server.online === true)
        //.filter(server => server.hidden === false)

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

  async function fetchPlayers(platform: string) {
    return api.server.getPlayers(platform)
      .then(response => {
        /*servers.value[platform].list.map(server => {
          if (Object.prototype.hasOwnProperty.call(response, server.slug)) {
            server.slots = response[server.slug].slots
            server.players = response[server.slug].players
          }
        })
         */
      })
  }

  return {
    servers,
    list,
    initialize,
    fetchPlayers,
  }
}, { persist: true })