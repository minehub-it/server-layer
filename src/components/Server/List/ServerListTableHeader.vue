<script setup lang="ts">
const serverListStore = useServerListStore()
const orders = computed(() => serverListStore.orders)
</script>

<template>
  <tr>
    <th></th>
    <th>
      <ServerListTableTh
          v-if="orders"
          label="Server"
          name="name"
          orderable
          :order="orders.name"
          @click="serverListStore.toggleOrder('name')"
      />
    </th>
    <th>
      <ServerListTableTh
          v-if="orders"
          label="Giocatori"
          name="players"
          orderable
          :order="orders['players']"
          @click="serverListStore.toggleOrder('players')"
      />
    </th>
    <th>
      <ServerListTableTh
          label="Versione"
          name="version"
      />
    </th>
    <th></th>
  </tr>
</template>

<style scoped lang="scss">

</style>