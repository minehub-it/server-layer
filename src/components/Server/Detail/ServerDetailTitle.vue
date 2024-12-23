<template>
  <div class="minehub-server-name font-weight-black text-truncate">
    {{title}}

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
.minehub-server-name {
  font-size: 20px;
  letter-spacing: 0.5px;

  @media(max-width: 599px) {
    font-size: 18px;
  }
}
</style>