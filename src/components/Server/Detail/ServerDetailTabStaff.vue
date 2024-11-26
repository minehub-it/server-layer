<template>
  <div id="server-staff" class="mb-n3">
    <v-row>
      <template v-for="(roles, roleName) in staff">
        <v-col
          v-if="roles.length > 0"
          :cols="6"
          class="staff-group"
        >
          <h6 class="text-subtitle-1 font-weight-bold text-uppercase text-truncate mb-2" v-text="roleName" />

          <v-list class="pa-0">

            <v-list-item class="pa-0" v-for="(member, key) in roles" :key="key">
              <!--
              <PlayerCard class="cursor-pointer" :member="member" @click="openPlayerDialog(member)" />
              -->

              <PlayerCard :member="member" />
            </v-list-item>

          </v-list>

        </v-col>
      </template>
    </v-row>

    <client-only>
      <PlayerSkinDialog
        :username="playerDialog.username"
        :model-value="playerDialog"
        @close="playerDialog = null"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  staff: Object,
})

const playerDialog: any = ref(null)

function openPlayerDialog(value: any) {
  playerDialog.value = value
}
</script>

<style lang="scss">
#minehub-server-staff {
  @media (max-width: 919px) {
    padding-bottom: 1px;

    > div {
      > div {
        display: block !important;

        > div {
          width: 100% !important;
        }
      }
    }
  }

  .staff-group {
    //margin-bottom: 18px;

    .username {
      cursor: default;
      margin-top: 2px;

      .username-missing-text {
        display: inline-block;
        max-width: calc(100% - 32px);
      }

      .username-missing-loading {
        display: inline-block;
        max-width: 32px;
      }
    }
  }
}
</style>
