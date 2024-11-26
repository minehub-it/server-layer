<template>
  <div id="server-stats">

    <div>

      <v-tabs
        v-model="statsTab"
        :color="themeColor"
        stacked :height="70"
         align-tabs="center"
      >
        <v-tab>
          Giocatori
          <v-icon end class="mr-1">mdi-account-group</v-icon>
        </v-tab>
      </v-tabs>

      <v-divider class="mt-0"/>

      <v-card-text>

        <v-window v-model="statsTab">
          <v-window-item>
            <ServerStatsPlayers
              :stats="stats.players"
              :server-id="serverId"
            />
          </v-window-item>
        </v-window>

      </v-card-text>

      <!--
      <v-tabs
        v-model="statsTab"
        :color="themeColorLighter"
        centered icons-and-text
      >
        <v-tabs-slider :color="themeColorLighter"/>

        <v-tab>
          Giocatori
          <v-icon>mdi-account-group</v-icon>
        </v-tab>

        <v-tab>
          Voti
          <v-icon>mdi-vote</v-icon>
        </v-tab>
      </v-tabs>

      <v-divider class="mt-0"/>

      <v-card-text>

        <v-window v-model="statsTab">
          <v-window-item>
            <ServerStatsPlayers
              :stats="stats.players"
              :server-id="serverId"
            />
          </v-window-item>

          <v-window-item>
            <ServerStatsVotes
              :stats="stats.votes"
              :server-id="serverId"
            />
          </v-window-item>
        </v-window>

      </v-card-text>
      -->

    </div>

  </div>
</template>

<script setup lang="ts">
import {useThemeStore} from "~/stores/storeTheme";

const props = defineProps({
  stats: Object,
  serverId: Number
})

const statsTab: any = ref(0)

const {themeColor} = useThemeStore()
</script>

<style lang="scss">
#server-stats {
  .v-tabs.theme--dark > .v-tabs-bar {
    background: none;
  }

  .v-tabs-items.theme--dark {
    background: none;
  }
}
</style>
