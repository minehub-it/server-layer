<template>
  <span
    class="server-ip text-truncate" @click="copyIp"
    v-text="props.address"
  />

  <client-only>
    <v-snackbar v-model="snackbar">
      Copiato l'IP in memoria
    </v-snackbar>
  </client-only>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  address: String,
})

const snackbar = ref(false)
let removeAllRangesTimeout = null


function copyIp(e) {
  const { text, copy } = useClipboard({ source: e.target.innerText })

  copy()
  snackbar.value = true

  clearTimeout(removeAllRangesTimeout)
  removeAllRangesTimeout = setTimeout(() => {
    document.getSelection().removeAllRanges()
  }, 2500)
}
</script>

<style scoped lang="scss">
.server-ip {
  margin-right: 2px;
  font-size: 13px;
  opacity: .75;
  user-select: all;
}
</style>