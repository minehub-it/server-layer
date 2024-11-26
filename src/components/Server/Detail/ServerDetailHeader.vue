<template>
  <div id="server-header">
    <v-toolbar class="px-5" height="110" :style="`background-color: ${server.themeColor} !important;`" :elevation="0">
      <v-row>
        <v-col :cols="6">

          <div class="d-flex align-center">

            <ServerDetailIcon
                :image="getServerFavicon(server)"
                :name="server.name"
                class="ml-6 mr-8"
            />

            <v-toolbar-title>
              <div class="mb-n2">
                <ServerDetailTitle :title="server.name" />
                <ServerDetailOnline v-if="server.online" />
              </div>
              <ServerDetailIp :address="server.address" />
            </v-toolbar-title>

          </div>

        </v-col>
        <v-col :cols="6">

          <div class="server-header-list-details text-right hidden-xs-only mr-3">
            <ServerDetailPlay
                class="mt-3"
                color="white"
                @click="emit('detailPreviewClick', server)"
            />
          </div>

        </v-col>
      </v-row>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs.selected"
          class="mx-1" fixed-tabs slider-color="white"
          grow
        >
          <v-tab v-for="(tab, key) in tabsList" :key="key">{{tab}}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
const mainColor = '#333'

const props = defineProps({
  server: Object,
  tabs: Object,
})

const emit = defineEmits(['detailPreviewClick'])

const snackbarVote = ref(false)
const snackbarVoteMessage = ref('')

const tabSliderColor = computed(() => {
  if (!props.server?.themeInvert) {
    return mainColor
  }

  //if (this.$store.state.common.theme.dark) {
    //return 'white'
  //}

  return 'black'
})

const tabsList = computed(() => {
  let list = []

  if (props.server?.description) list.push('Server')

  if (Object.keys(props.server?.staff).length) list.push('Staff')

  if (Array.isArray(props.server?.gallery) && props.server?.gallery.length > 0) list.push('Gallery')

  // list.push('Statistiche')

  if (props.server?.twitter) list.push('Novità')

  return list
})
</script>

<style lang="scss">
#server-header {
  user-select: none;

  .v-tabs {
    @media (min-width: 720px) {
      max-width: 60%;
    }

    .v-slide-group__prev {
      display: none;
    }

    .v-tab {
      color: white;
    }

    .v-tabs__div {
      @media (min-width: 560px) {
        min-width: 170px;
      }
      @media (min-width: 880px) {
        min-width: 230px;
      }
    }

    .v-item-group {
      background: none !important;
    }
  }

  .server-header-list-details {
    margin-top: 1px;
    line-height: 18px;
  }

  .server-vote {
    margin-right: -4px;

    @media (min-width: 960px) {
      margin-right: -8px;
    }
  }

  .server-vote-count {
    cursor: default;
  }

  &.server-voted {
    .server-vote {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
    }

    .server-vote-view {
      display: none;
    }
  }

  .server-name {
    color: white;
  }

  .server-ip {
    color: #fff;
    opacity: .75;
  }
}
</style>
