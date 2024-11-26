<script setup lang="ts">
defineProps<{
  server: IServer
}>()
</script>

<template>
  <div class="minehub-server-categories">
    <v-chip
      v-for="category of server.categories"
      class="text-overline mr-2" size="x-small"
      :text="category"
    />
  </div>
</template>

<style scoped lang="scss">
.text-overline {
  display: inline-block;
  font-size: 11px !important;
  letter-spacing: 1.4px !important;
  line-height: 21px !important;
}
</style>