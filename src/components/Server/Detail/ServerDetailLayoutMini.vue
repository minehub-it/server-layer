<template>
  <v-row>
    <v-col class="flex-grow-0 px-5">
      <nuxt-link :to="`/server/${server.slug}`">
        <ServerDetailIcon class="mr-2" :image="server.favicon" style="margin-top: -2px;" />
      </nuxt-link>
    </v-col>
    <v-col class="flex-grow-1">
      <div>
        <v-row>
          <v-col class="pa-0 pt-2">
            <nuxt-link :to="`/server/${server.slug}`" class="color-inherit">
              <ServerDetailTitle class="position-relative" :title="server.name" />
            </nuxt-link>

            <ServerDetailOnline v-if="server.online" />
          </v-col>
          <v-col class="pa-0 pt-2 text-right">
            <ServerDetailPlayers :server="server" />
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col class="pa-0 pt-3">
            <ServerDetailIp :address="server.address" />
          </v-col>
          <v-col class="pa-0 pt-3 text-right">
            <ServerDetailVersions :server="server" />
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col class="flex-grow-0 text-right" style="min-width: 160px;">
      <div style="margin-top: -3px;">
        <v-tooltip text="Vai al sito web" location="top end">
          <template v-slot:activator="{ props }">
            <v-btn flat class="px-0 mr-2" :min-width="30" v-bind="props" :href="server.web" target="_blank">
              <v-icon size="23px" style="margin-top: -2px;">mdi-web</v-icon>
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Collegati al server Minecraft" location="top end">
          <template v-slot:activator="{ props }">
            <v-btn flat class="px-0" :min-width="40" @click="onCopyServerAddress" v-bind="props">
              <v-icon size="22px">mdi-login-variant</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>

      <v-snackbar v-model="snackbar">
        Copiato l'IP in memoria
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  server: Object as () => IServer,
})

const emit = defineEmits(['connecting'])

const snackbar = ref(false)

const { text, copy } = useClipboard({ source: props.server.address })

function onCopyServerAddress() {
  copy(props.server.address)
  snackbar.value = true
  emit('connecting')
}
</script>

<style scoped lang="scss">

</style>