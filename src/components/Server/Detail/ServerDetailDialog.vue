<template>
  <v-dialog v-model="dialog" width="680px" max-width="90%">
    <v-card v-if="props.server" width="680px" max-width="90%" class="ma-auto">
      <v-img
        class="minehub-dialog-background" :style="`height: 176px; background-color: #222;`"
        :src="props.server.banner" cover
      />
      <v-progress-linear :color="props.server.themeColor" :indeterminate="connecting" />

      <v-card-text class="py-5">
        <ServerDetailLayoutMini
          :server="props.server"
          @connecting="onConnecting"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {Ref} from "vue";

const props = defineProps({
  server: Object as () => IServer,
})

const dialog: Ref<boolean> = ref(!!props.server)

const emit = defineEmits(['close'])

const connecting = ref(false)
const connectingTimeout = ref(false)

function onConnecting() {
  connecting.value = true

  clearTimeout(connectingTimeout.value)
  connectingTimeout.value = setTimeout(() => connecting.value = false, 30000)
}

watch(() => props.server, (value) => {
  if (value) dialog.value = true
})

watch(() => dialog.value, (value) => {
  if (!value) {
    emit('close')
    connecting.value = false
  }
})
</script>

<style scoped lang="scss">
.minehub-dialog-background {
  background-image: url('assets/images/server/bg-wool-dark.png');
}
</style>