<template>
  <v-avatar rounded :size="36" class="minehub-server-favicon">
    <img :src="image" :alt="name" />
  </v-avatar>
</template>

<script setup lang="ts">
defineProps<{
  image?: string
  name: string
}>()
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>