<script setup lang="ts">
const serverListStore = useServerListStore()
const serverDetailStore = useServerDetailStore()
const list = computed(() => serverListStore.list)

const table = {
  headers: [
    {text: '', value: 'position', sortable: false},
    {text: '', value: 'favicon', sortable: false},
    {text: 'Server', value: 'name', align: 'left'},
    {text: 'Giocatori', value: 'players'},
    {text: 'Versione', value: 'version', sortable: false},
    {text: 'Voti', value: 'votes', align: 'center'},
  ],
}
</script>

<template>
  <ServerListHeader/>
  <ServerFeatured class="mb-3"/>

  <ServerListContentHead/>

  <ServerListToolbar
    v-if="list.length > 0"
  />

  <ServerListContent
      :table="table"
      :servers="list"
  />

  <client-only>
    <ServerDetailDialog
        v-if="serverDetailStore.server"
        :server="serverDetailStore.server"
    />

    <ServerListFetchPlayersWatcher/>
  </client-only>

  <MainFooter v-if="list.length > 0" />
</template>