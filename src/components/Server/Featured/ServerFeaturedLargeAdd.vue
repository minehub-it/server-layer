<script setup lang="ts">

</script>

<template>
  <v-card :href="patreonCheckoutLink(9897833)" target="_blank" rounded height="100%">
    <v-icon :size="48" icon="mdi-plus" />
  </v-card>
</template>

<style scoped>
.v-card {
  position: relative;
}
.v-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -6px;
  opacity: 0.25;
}
</style>