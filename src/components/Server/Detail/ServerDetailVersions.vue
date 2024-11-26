<template>
  <div>
    {{versionsToString(server.versions)}}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  server: IServer
}>()
</script>

<style scoped lang="scss">

</style>