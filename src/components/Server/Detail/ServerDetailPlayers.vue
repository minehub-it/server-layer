<script setup lang="ts">
defineProps<{
  server: IServer
}>()
</script>

<template>
  <div class="minehub-server-detail__players">
    <div v-if="server.online">
      <span class="players" />
      <span class="slots text-grey" v-text="' / ' + server.slots"/>
    </div>

    <!-- Server slots -->
    <div v-else-if="server.slots > 0">
      <span class="slots text-grey darken-3" v-text="server.slots"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@property --num {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.minehub-server-detail__players {
  @media(max-width: 959px) {
    position: absolute;
    right: 0;
  }

  .players {
    transition: --num 1s;
    counter-reset: num var(--num);
    --num: v-bind("server.players");

    &::after {
      content: counter(num);
    }
  }
}
</style>