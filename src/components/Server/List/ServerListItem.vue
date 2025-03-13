<script setup lang="ts">
const props = defineProps<{
  server: IServer
}>()

const serverDetailStore = useServerDetailStore()
const serverFavoriteStore = useServerFavoriteStore()

function onFavoriteToggle() {
  serverFavoriteStore[
      !serverFavoriteStore.isFavorite(props.server.address) ? 'add' : 'remove'
  ](props.server.address)
}
</script>

<template>
  <v-card
      rounded class="py-2"
      :data-server-id="server.id"
      :key="server.address"
  >

    <template #prepend>
      <nuxt-link class="d-inline-block px-3 mt-6 mr-1" :to="serverRoute(server)">
        <ServerDetailIcon :image="server.favicon" :name="server.name"/>
      </nuxt-link>
    </template>

    <template #item>

      <div>
        <ServerDetailTitle :title="server.name">
          <ServerDetailOnline v-if="server.online" />
        </ServerDetailTitle>
      </div>
      <ServerDetailIp :address="server.address"/>
    </template>

    <template #subtitle>
      <ServerDetailCategories :server="server" class="mb-1" />
    </template>

    <template #append>
      <ServerDetailPlayers
          :server="server"
          class="mr-8"
      />

      <ServerDetailFavorite
          :is-favorite="serverFavoriteStore.isFavorite(server.address)"
          @click="onFavoriteToggle"
          class="mr-8 hidden-sm-and-down"
      />

      <ServerDetailPlay
          class="mr-3 hidden-sm-and-down"
          @click="serverDetailStore.setServer(server)"
      />
    </template>
  </v-card>
</template>

<style scoped lang="scss">
tr td {
  padding-top: 16px !important;
  padding-bottom: 16px !important;
}
</style>