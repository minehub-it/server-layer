<template>
  <v-table class="board__server-list">
    <thead>
    <ServerListTableHeader />
    </thead>
    <tbody>
    <template v-if="Array.isArray(props.servers) && props.servers.length > 0">
      <ServerListTableItem
        v-for="server of props.servers"
        :server="server"
        @detailPreviewClick="emit('serverDialogPreview', server)"
      />
    </template>
    <template v-else>
      <tr class="no-pointer-events">
        <td colspan="5" class="text-grey" style="padding-top: 56px !important; padding-bottom: 56px !important;">
          Non ci sono server da mostrare
        </td>
      </tr>
    </template>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
const serverListStore = useServerListStore()

const props = defineProps<{
  table: any
  servers: IServer[]
}>()

const emit = defineEmits(['serverDialogPreview'])

const tableOrder: any = reactive({
  sortBy: null,
  sortDesc: null,
})
</script>

<style lang="scss">
.board__server-list {
  .server-name,
  .server-address {
    max-width: 225px;
  }

  .server-categories {
    font-size: 11px;
    word-spacing: 1px;
    letter-spacing: -0.25px;
    color: #999;
    opacity: 0.75;
    cursor: default;
  }

  thead {
    tr {
      th {
        font-size: 14px;

        &:last-child {
          i.mdi {
            margin-right: -22px;
          }
        }
      }
    }
  }

  th,
  td {
    padding: 7px 0 !important;

    @media (max-width: 600px) {
      padding: 5px 0 5px 15px;
    }
    @media (max-width: 320px) {
      padding: 5px 0 5px 12px;
    }

    // favicon
    &:nth-child(1) {
      text-align: center;
      width: 12%;
      padding: 0 !important;

      @media (max-width: 1024px) {
        width: 16%;
      }

      @media (max-width: 800px) {
        width: 20%;
      }
    }

    // server name
    &:nth-child(2) {
      width: 48%;
      padding-left: 0 !important;

      // colore di default sui link
      .v-list-item-title {
        margin-bottom: -4px !important;

        a {
          color: inherit;
        }
      }
    }

    // players/slot
    &:nth-child(3) {
      @media (max-width: 600px) {
        padding-right: 36px !important;
        text-align: right;
      }
      @media (max-width: 480px) {
        display: none;
      }
    }

    // versione
    &:nth-child(4) {

      // nascosto da mobile
      @media (max-width: 600px) {
        display: none;
      }
    }

    // connect
    &:nth-child(5) {
      padding-right: 48px !important;

      // nascosto da mobile
      @media (max-width: 800px) {
        display: none;
      }
    }

    // connettiti
    &:last-child {
      padding: 0;
      width: 12%;

      > div {
        position: relative;

        &.already-voted-today {
          .server-vote {
            display: none;
          }
        }

        &:not(.already-voted-today) {
          .server-vote-view {
            display: none;
          }

          .server-vote {
            display: inline-block;
          }
        }

        .server-vote {
          display: none;
        }

        &.server-voted {
          position: relative;

          .server-vote {
            display: inline-block;
          }

          .server-vote-view {
            display: none;
          }

          @media (min-width: 960px) {
            .server-vote-view {
              display: inline-block;

              & + div {
                transform: translateX(50px);
              }
            }
          }
        }

        .server-vote-view + div {
          position: absolute;
          top: 50%;
          right: 50%;
          margin-top: -18px;
          margin-right: -22px;
          transform: translateX(0);
          transition: transform 0.2s ease-in-out;

          @media (max-width: 375px) {
            margin-right: -20px;
          }
        }

        @media (max-width: 375px) {
          padding: 0 10px 0 0;
          width: 20%;
        }
      }
    }
  }

  td {
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      font-size: 12px;

      @media (max-width: 320px) {
        font-size: 11px;
      }
    }
  }

  &:hover {
    td {
      &:last-child {
        .server-vote {
          display: inline-block !important;
        }
      }
    }
  }

  // tema scuro
  &.v-theme--dark {
    thead {
      tr:first-child {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
    }

    tbody {
      tr:hover:not(.v-datatable__expand-row) {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  // tema chiaro
  &.v-theme--light {
    thead {
      tr:first-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
    }

    tbody {
      tr:hover:not(.v-datatable__expand-row) {
        background: rgba(0, 0, 0, 0.045);
      }
    }
  }
}
</style>
