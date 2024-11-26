<template>
  <v-container>
    <ServerListHeader />
    <ServerFeatured />

    <ServerListTable
      :table="table"
      :servers="list"
      @serverDialogPreview="onServerDialogPreview"
    />

    <client-only>
      <ServerDetailDialog
        :server="serverDetailReactive"
        @close="serverDetail = null"
      />
    </client-only>
  </v-container>
</template>

<script setup lang="ts">
const serverListStore = useServerListStore()
const list = computed(() => serverListStore.list)

const serverCategoryStore = useServerCategoryStore()

const dialogServerListWIP = ref(!import.meta.env.SSR && window.location.hash === '#cambiamenti')

const table = {
  headers: [
    { text: '', value: 'position', sortable: false },
    { text: '', value: 'favicon', sortable: false },
    { text: 'Server', value: 'name', align: 'left' },
    { text: 'Giocatori', value: 'players' },
    { text: 'Versione', value: 'version', sortable: false },
    { text: 'Voti', value: 'votes', align: 'center' },
  ],
}

const serverDetail: Ref<IServer|null> = ref(null)
const serverDetailReactive: any = computed(() => {
  if (!serverDetail.value) return null
  return list.value.find(server => server.slug === serverDetail.value.slug)
})

function onServerDialogPreview(server: IServer) {
  serverDetail.value = server
}

let intervalFetchServers: any = null

onMounted(() => {
  const { idle } = useIdle(4000)

  intervalFetchServers = setInterval(() => {
    if (idle.value) return false

    //fetchPlayers(filters.platform).catch(e => {})
  }, 5000)
})

onBeforeRouteLeave((from, to) => {
  clearInterval(intervalFetchServers)
})
</script>
