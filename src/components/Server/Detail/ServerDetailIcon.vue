<template>
  <v-avatar rounded :size="36" class="minehub-server-favicon">
    <v-img :src="image" :alt="name" />
  </v-avatar>
</template>

<script setup lang="ts">
defineProps<{
  image?: string
  name: string
}>()
</script>
