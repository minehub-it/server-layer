<template>
  <span
    class="minehub-server-name font-weight-black text-truncate"
    v-text="title"
  />
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
.minehub-server-name {
  font-size: 20px;
  letter-spacing: 0.5px;
}
</style>