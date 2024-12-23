<script setup lang="ts">
const serverFilterStore = useServerFilterStore()
</script>

<template>
  <div class="v-row v-row--no-gutters minehub-server-list__toolbar mt-6 pb-3">
    <v-col class="flex-grow-1">
      <ServerListToolbarItem
          label="Nome"
          name="name"
          orderable
          :order="serverFilterStore.orders.name"
          @click="serverFilterStore.toggleOrder('name')"
      />
    </v-col>
    <v-col class="flex-grow-0">
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

  .flex-grow-1 {
    padding-left: 90px;
  }

  .flex-grow-0 {
    min-width: 286px;
    text-align: right;
    padding-right: 130px;
  }
}
</style>