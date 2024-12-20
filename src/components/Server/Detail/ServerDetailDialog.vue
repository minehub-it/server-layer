<script setup lang="ts">
const props = defineProps<{
  server: IServer,
}>()

const serverDetailStore = useServerDetailStore()

const dialog: Ref<boolean> = ref(!!props.server)

const connecting = ref(false)
const connectingTimeout = ref(0)

function onConnecting() {
  connecting.value = true

  clearTimeout(connectingTimeout.value)
  connectingTimeout.value = setTimeout(() => connecting.value = false, 30000)
}

watch(() => dialog.value, (value) => {
  if (!value) {
    serverDetailStore.setServer(undefined)
    connecting.value = false
  }
})
</script>

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

<style scoped lang="scss">

</style>