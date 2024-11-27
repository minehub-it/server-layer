<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  address: string
}>()

const snackbar = ref(false)

function copyIp(e) {
  const { text, copy } = useClipboard({ source: e.target.innerText })

  copy()
  snackbar.value = true
}
</script>

<template>
  <div
    class="minehub-server-ip text-truncate" @click="copyIp"
    v-text="props.address"
  />

  <client-only>
    <v-snackbar v-model="snackbar">
      Copiato l'IP in memoria
    </v-snackbar>
  </client-only>
</template>

<style scoped lang="scss">
.minehub-server-ip {
  display: inline-block;
  line-height: 1.425;
  font-size: 0.875rem;
  user-select: all;
  opacity: 0.6;
}
</style>