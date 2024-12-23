<template>
  <div
    :class="[`board-server-list-table-th board-server-list-table-th--${props.name}`, {'cursor-pointer': props.orderable}]"
  >
    {{props.label}}

    <template v-if="props.orderable">
      <v-icon v-if="props.order === 'az'">mdi-arrow-up</v-icon>
      <v-icon v-if="props.order === 'za'">mdi-arrow-down</v-icon>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  label: String,
  order: String,
  orderable: Boolean,
})
</script>

<style scoped lang="scss">
.board__server-list {
  :deep(table thead tr th:nth-child(3)) {
    @media(max-width: 599px) {
      text-align: right;
      padding-right: 16px !important;
    }
  }
}

.board-server-list-table-th {
  &--players {
    @media(max-width: 599px) {
      padding-right: 0;
      text-align: right;
    }
  }
}

.v-icon {
  font-size: 16px;

  &.mdi-arrow-up {
    vertical-align: -1px;
  }

  &.mdi-arrow-down {
    vertical-align: -1px;
  }
}
</style>