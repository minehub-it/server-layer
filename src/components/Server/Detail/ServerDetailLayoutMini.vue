<template>
  <v-row class="py-2">
    <v-col class="flex-grow-0 px-5">
      <nuxt-link :to="serverRoute(server)">
        <ServerDetailIcon class="mr-2" :image="server.favicon" style="margin-top: -2px;" />
      </nuxt-link>
    </v-col>
    <v-col class="flex-grow-1" align-self="center">
      <v-row>
        <v-col class="pa-0">
          <nuxt-link :to="serverRoute(server)" class="color-inherit">
            <ServerDetailTitle class="position-relative" :title="server.name">
              <ServerDetailOnline v-if="server.online" />
            </ServerDetailTitle>
          </nuxt-link>

        </v-col>
        <v-col class="pa-0 pt-2 text-right" align-self="center">
          <ServerDetailPlayers style="position: relative; top: 8px;" :server="server" />
        </v-col>
      </v-row>

      <div>
        <v-row>
          <v-col class="pa-0 pt-3 mb-n1">
            <ServerDetailIp :address="server.address" />
          </v-col>
          <v-col class="pa-0 pt-3 text-right">
            <ServerDetailVersions :server="server" />
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col class="flex-grow-0 text-right" align-self="center" style="min-width: 160px;">
      <v-tooltip v-if="server.web" text="Vai al sito web" location="top end">
        <template v-slot:activator="{ props }">
          <v-btn flat class="px-0 mr-2" :min-width="30" v-bind="props" :href="server.web" target="_blank">
            <v-icon size="23px" style="margin-top: -2px;">mdi-web</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip text="Collegati al server Minecraft" location="top end">
        <template v-slot:activator="{ props }">
          <v-btn flat class="px-0 mt-n1" :min-width="40" @click="onCopyServerAddress" v-bind="props">
            <v-icon :size="26">mdi-login-variant</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-snackbar v-model="snackbar">
        Copiato l'IP in memoria
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  server: IServer,
}>()

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