<script setup lang="ts">
definePageMeta({
  layout: 'slider'
})
</script>

<template>
  <SliderVertical
      :slides-per-view="2.5" :space-between="24"
      class="px-6"
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
.minehub-slider-vertical {
  height: 100dvh;
  max-width: 1200px;
  margin: 0 auto;

  @media(max-width: 959px) {
    height: calc(100dvh - 100px) !important;
  }
}

swiper-container {
  > swiper-slide:last-child {
    margin-bottom: 0 !important;
  }
}
</style>