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
      placeholder="Categoria" variant="solo"
      class="minehub-smart-search-2 hidden-md-and-up mb-0"
      hide-details
  />
</template>