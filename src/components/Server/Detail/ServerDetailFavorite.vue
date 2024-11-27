<script setup lang="ts">
defineProps<{
  isFavorite: boolean
}>()
</script>

<template>
  <v-icon :icon="isFavorite ? 'mdi-star' : 'mdi-star-outline'" />
</template>