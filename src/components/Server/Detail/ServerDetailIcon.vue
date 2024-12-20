<template>
  <div class="minehub-server-favicon">
    <img :src="image" :alt="name" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: string
  name: string
}>()
</script>

<style scoped lang="scss">
img {
  width: 36px;
  aspect-ratio: 1;
  border-radius: 4px;
  object-fit: cover;
}
</style>