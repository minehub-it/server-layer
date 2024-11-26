<template>
  <span
    class="server-name body-1 font-weight-medium text-truncate"
    v-text="title"
  />
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">

</style>