<template>
  <div class="v-list-item px-0">
    <div class="v-list-item-title">
      {{ title }}
      <v-icon small>{{mdiIcon}}</v-icon>
      <IconBrand :name="props.simpleIcon" />
    </div>
    <div class="v-list-item-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  title: String,
  mdiIcon: String,
  simpleIcon: String,
})
</script>

<style lang="scss">
#minehub-server-page .column-sidebar {
  .brand-icon {
    height: 16px;
    width: 16px;
    mask: var(--simple-icon);
    opacity: 0.35;

    &.v-theme--light {
      background: #000;
    }

    &.v-theme--dark {
      background-color: #fff;
    }
  }
}
</style>