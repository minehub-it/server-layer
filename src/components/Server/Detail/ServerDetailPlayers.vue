<template>
  <small v-if="server.online">
    <span class="players" v-text="Number(server.players)"/>
    <span class="slots text-grey" v-text="' / ' + Number(server.slots)"/>
  </small>

  <!-- Server slots -->
  <small v-else>
    <span class="slots text-grey darken-3" v-text="Number(server.slots)"/>
  </small>
</template>

<script setup lang="ts">
defineProps<{
  server: IServer
}>()
</script>

<style scoped lang="scss">

</style>