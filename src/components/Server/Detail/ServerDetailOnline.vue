<template>
  <client-only>
    <v-tooltip text="Server online" right :open-delay="1500" :disabled="!tooltip">
      <template v-slot:activator="{ props }">
        <span class="minehub-server-online" v-bind="props" />
      </template>
    </v-tooltip>
  </client-only>
</template>

<script setup lang="ts">
defineProps({
  tooltip: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped lang="scss">
.minehub-server-online {
  position: relative;
  display: inline-block;
  background-color: #15a018;
  box-shadow: inset 0 1px 2px 0 #ffffff30;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 4px;
  vertical-align: 2px;
}
</style>
