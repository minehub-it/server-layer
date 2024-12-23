<template>
  <div class="minehub-server-detail__players">
    <div v-if="server.online">
      <span class="players" v-text="server.players"/>
      <span class="slots text-grey" v-text="' / ' + server.slots"/>
    </div>

    <!-- Server slots -->
    <div v-else-if="server.slots > 0">
      <span class="slots text-grey darken-3" v-text="server.slots"/>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  server: IServer
}>()
</script>

<style scoped lang="scss">
.minehub-server-detail__players {
  @media(max-width: 959px) {
    position: absolute;
    right: 0;
  }
}
</style>