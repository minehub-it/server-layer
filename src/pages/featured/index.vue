<script setup lang="ts">
definePageMeta({
  layout: 'slider'
})
</script>

<template>
  <SliderVertical
      :slides-per-view="2.5" :space-between="24"
      class="px-6 py-md-6"
  >
    <swiper-slide>
      <ServerFeaturedLargeAdd />
    </swiper-slide>
    <swiper-slide>
      <ServerFeaturedLargeAdd />
    </swiper-slide>
    <swiper-slide>
      <ServerFeaturedLargeAdd />
    </swiper-slide>
    <swiper-slide>
      <ServerFeaturedLargeAdd />
    </swiper-slide>
  </SliderVertical>
</template>

<style scoped lang="scss">

</style>