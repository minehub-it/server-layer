<template>
  <div class="minehub-content-description" v-html="props.description" />
</template>

<script setup lang="ts">
const props = defineProps({
  visible: Boolean,
  description: String,
})
</script>