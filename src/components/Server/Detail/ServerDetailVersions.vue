<template>
  <small>
    <template v-if="props.for && !server.versionsString.startsWith('da')">per</template>
    {{server.versionsString}}
  </small>
</template>

<script setup lang="ts">
const props = defineProps<{
  server: IServer
  for?: boolean
}>()
</script>

<style scoped lang="scss">

</style>