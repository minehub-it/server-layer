<script setup lang="ts">
const serverListStore = useServerListStore()
const list = computed(() => serverListStore.list)

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
</script>

<template>
  <ServerListHeader class="mt-2" />
  <ServerFeatured class="mb-3" />

  <ServerListContentHead />

  <ServerListToolbar />

  <ServerListContent
    :table="table"
    :servers="list"
    @serverDialogPreview="onServerDialogPreview"
  />

  <client-only>
    <ServerDetailDialog
      :server="serverDetailReactive"
      @close="serverDetail = null"
    />

    <ServerListFetchPlayersWatcher />
  </client-only>

  <MainFooter />
</template>