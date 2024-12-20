<template>
  <div id="minehub-server-header">
    <v-toolbar class="px-5" height="110" :style="`background-color: ${server.themeColor} !important;`" :elevation="0">
      <v-row>
        <v-col :cols="6">

          <div class="d-flex align-center">

            <ServerDetailIcon
                :image="server.favicon"
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

          <div class="minehub-server-header-list-details text-right hidden-xs-only mr-3">
            <ServerDetailPlay
                class="mt-3"
                color="white"
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
#minehub-server-header {
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

  .minehub-server-header-list-details {
    margin-top: 1px;
    line-height: 18px;
  }

  .minehub-server-vote {
    margin-right: -4px;

    @media (min-width: 960px) {
      margin-right: -8px;
    }
  }

  .minehub-server-vote-count {
    cursor: default;
  }

  &.minehub-server-voted {
    .minehub-server-vote {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
    }

    .minehub-server-vote-view {
      display: none;
    }
  }

  .minehub-server-name {
    color: white;
  }

  .minehub-server-ip {
    color: #fff;
    opacity: .75;
  }
}
</style>
