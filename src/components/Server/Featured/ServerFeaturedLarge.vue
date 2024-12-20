<script setup lang="ts">
defineProps<{
  href: string
  image: string
}>()
</script>

<template>
  <v-card :href="href" target="_blank" rounded height="100%">
    <v-img height="100%" cover :src="image" />
  </v-card>
</template>

<style scoped>

</style>