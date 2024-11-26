<template>
  <v-list
    class="column-sidebar py-0"
    two-line
  >
    <ServerDetailSidebarItem
      v-show="server.address"
      title="IP Server"
      mdiIcon="mdi-server"
    >
      <v-row no-gutters>
        <v-col xs-8>
          <slot name="copy-ip" />
        </v-col>
        <v-col
          xs-4
          class="minehub-server-version"
        >
          {{ server.versionsString }}
        </v-col>
      </v-row>
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      title="Categorie"
      mdiIcon="mdi-shape-outline"
    >
      <template v-if="server.categories && categoriesNames(server.categories).length">
        <template v-for="(category, i) of categoriesNames(server.categories)">
          <nuxt-link
            :to="'/lista-server-' + convertPlatformIdToSlug(filters.platform) + '/' + category.toLowerCase()"
            v-text="category"
          /><template
          v-if="i !== categoriesNames(server.categories).length-1"
        >, </template>
        </template>
      </template>
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.web"
      title="Sito web"
      mdiIcon="mdi-open-in-new"
    >
      <a
        :href="server.web"
        rel="nofollow noopener"
        target="_blank"
        v-text="server.web"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.forum"
      title="Forum"
      mdiIcon="mdi-forum-outline"
    >
      <a
        :href="server.forum"
        rel="nofollow noopener"
        target="_blank"
        v-text="server.forum"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.twitter"
      title="Twitter"
      simpleIcon="twitter"
    >
      <a
        :href="`https://twitter.com/${server.twitter}`"
        rel="nofollow noopener"
        target="_blank"
        v-text="`@${server.twitter}`"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.instagram"
      title="Instagram"
      simpleIcon="instagram"
    >
      <a
        :href="`https://instagram.com/${server.instagram}`"
        rel="nofollow noopener"
        target="_blank"
        v-text="`@${server.instagram}`"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.tiktok"
      title="Tiktok"
      simpleIcon="tiktok"
    >
      <a
        :href="`https://www.tiktok.com/@${server.tiktok}`"
        rel="nofollow noopener"
        target="_blank"
        v-text="`@${server.tiktok}`"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.telegram"
      title="Telegram"
      simpleIcon="telegram"
    >
      <a
        :href="server.telegram"
        rel="nofollow noopener"
        target="_blank"
        v-text="server.telegram"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.discord"
      title="Discord"
      simpleIcon="discord"
    >
      <a
        :href="server.discord"
        rel="nofollow noopener"
        target="_blank"
        v-text="server.discord"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.teamspeak"
      title="TeamSpeak"
      simpleIcon="teamspeak"
    >
      <a
        :href="'ts3server://' + server.teamspeak"
        v-text="server.teamspeak"
      />
    </ServerDetailSidebarItem>

    <ServerDetailSidebarItem
      v-show="server.mumble"
      title="Mumble"
      simpleIcon="mumble"
    >
      <a
        :href="'mumble://' + server.mumble"
        v-text="server.mumble"
      />
    </ServerDetailSidebarItem>

    <div class="v-list-item px-0">
      <div class="v-list-item-title">
        Stato server
        <ServerDetailOnline
          v-if="server.online"
          :tooltip="false"
        />
      </div>
      <div class="v-list-item-content">
        <v-row class="ma-0">
          <v-col class="pa-0">
            <span
              v-if="server.online"
              class="green--text text--darken-1"
            >
              Online
            </span>
            <span
              v-if="!server.online"
              class="grey--text text--darken-1"
            >
              Offline
            </span>
          </v-col>
          <v-col class="pa-0 text-right">
            <span class="minehub-server-players">
              <template v-if="server.players === 1">
                1 giocatore
              </template>
              <template v-else> {{ server.players }} giocatori </template>
            </span>
            <span
              class="slots"
              v-text="'/ ' + server.slots"
            />
          </v-col>
        </v-row>
      </div>
    </div>


    <!--
    <ServerDetailSidebarItem
      v-if="server.position >= 0"
      title="Classifica"
      icon="mdi-view-list"
    >
      <div class="minehub-server-header-list-details-votes-count caption">
        <div>
          <template v-if="new Date().getDate() === 1">
            Nel mese precedente
          </template>
          <template v-else>
            Votato {{ server.votes }}
            <template v-if="server.votes === 1">
              volta
            </template>
            <template v-else>
              volte
            </template>
          </template>
        </div>
        <div
          v-if="!server.hidden"
          class="text-right"
        >
          <span title="Per numero di voti">{{ server.position }}° posizione</span>
        </div>
      </div>
    </ServerDetailSidebarItem>
    -->
  </v-list>
</template>

<script setup lang="ts">
import {convertPlatformIdToSlug} from "~/utils/utilsServer";
import {useServerCategoryStore} from "~/stores/storeServerCategory";
import {useServerListStore} from "~/stores/storeServerList";

const props = defineProps({
  server: Object,
})

const {categoriesNames} = useServerCategoryStore()
const serverListStore = useServerListStore(),
    filters = computed(() => serverListStore.filters)
</script>

<style lang="scss">
.column-sidebar {
  background: none !important;

  .v-list-item {
    display: block;
    width: 100%;


    &:last-child {
      padding-bottom: 0;

      .v-list-item__subtitle {
        margin-bottom: 0;
      }
    }

    .v-list-item-title {
      text-transform: uppercase;
      font-weight: 500;

      position: relative;
      font-weight: 600;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      cursor: default;
      height: 28px;
      margin-bottom: 10px;

      .v-icon {
        position: absolute;
        right: 0;
        opacity: 0.4;
        font-size: 18px;
      }

      .minehub-server-online {
        float: right;
        margin-top: 8px;
      }
    }

    .v-list-item-content {
      font-size: 13px;
      margin-bottom: 10px;
      color: #999;

      &.minehub-server-status {
        cursor: default;
      }

      a {
        color: inherit;
      }

      .minehub-server-version {
        margin-top: 3px;
        font-size: 11px;
        line-height: 15px;
        cursor: default;
        opacity: 0.5;
        text-align: right;
      }
    }
  }
}
</style>
