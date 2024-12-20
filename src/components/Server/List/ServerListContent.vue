<script setup lang="ts">
defineProps<{
  table: any
  servers: IServer[]
}>()
</script>

<template>
  <template v-if="Array.isArray(servers) && servers.length > 0">
    <ServerListItem
        v-for="server of servers"
        class="mb-5"
        :server="server"
    />
  </template>
  <template v-else>
    <div class="text-center text-grey py-16 no-pointer-events">
      Non ci sono server da mostrare
    </div>
  </template>
</template>