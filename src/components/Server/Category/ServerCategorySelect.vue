<script setup lang="ts">
defineProps<{
  categories: any[];
}>()
</script>

<template>
  <v-select
      :items="categories"
      item-title="name"
      item-value="slug"
      variant="solo"
      label="Categoria"
      class="minehub-smart-search-2 hidden-md-and-up mb-0"
  />
</template>