<template>
  <tr :data-id="server.id">
    <td>
      <span class="position d-none">{{ server.position }}</span>

      <nuxt-link :to="`/server/${server.slug}`">
        <ServerDetailIcon :image="getServerFavicon(server)" :name="server.name"/>
      </nuxt-link>

    </td>

    <td>

      <v-list-item-title class="ma-0">
        <!-- Server name -->
        <nuxt-link :to="`/server/${server.slug}`">
          <ServerDetailTitle
              :title="server.name"
          />
        </nuxt-link>

        <!-- Stato online -->
        <template v-if="server.online">
          <ServerDetailOnline/>
        </template>
      </v-list-item-title>

      <!-- Server IP -->
      <!--
      <ServerDetailIp :address="server.address"/>
      -->

      <span class="server-categories text-truncate">
        <span v-show="server.categories">{{ categoriesNames(server.categories).join(', ') }}</span>
      </span>

    </td>

    <td>

      <!--
      <ServerDetailPlayers :server="server" />

      <div class="hidden-sm-and-up">
        <ServerDetailVersions for :server="server" />
      </div>
      -->
    </td>
    <td>
      <ServerDetailVersions :server="server"/>
    </td>
    <td class="text-right pr-12">
      <ServerDetailPlay
          @click="emit('detailPreviewClick', server)"
      />
      <div>
        <!--
        <span class="server-vote-view grey--text" v-if="alreadyVotedToday">
        {{ server.votes }}
        </span>
        <ServerDetailVote
          :id-server="server.listId"
        />
        -->
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  server: IServer
}>()

const emit = defineEmits(['detailPreviewClick'])

const {categoriesNames} = useServerCategoryStore()
</script>

<style scoped lang="scss">
tr td {
  padding-top: 16px !important;
  padding-bottom: 16px !important;
}
</style>