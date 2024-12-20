<script setup lang="ts">
const serverFilterStore = useServerFilterStore()
</script>

<template>
  <div class="v-row v-row--no-gutters minehub-server-list__toolbar mt-4 pb-3">
    <v-col class="flex-grow-1" style="padding-left: 90px;">
      <ServerListToolbarItem
          label="Nome"
          name="name"
          orderable
          :order="serverFilterStore.orders.name"
          @click="serverFilterStore.toggleOrder('name')"
      />
    </v-col>
    <v-col class="flex-grow-0" style="min-width: 236px;">
      <ServerListToolbarItem
          label="Giocatori"
          name="players"
          orderable
          :order="serverFilterStore.orders.players"
          @click="serverFilterStore.toggleOrder('players')"
      />
    </v-col>
  </div>
</template>

<style scoped lang="scss">
.minehub-server-list__toolbar {
  opacity: 0.3;
}
</style>