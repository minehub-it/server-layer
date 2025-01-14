<script setup lang="ts">
const serverFeaturedStore = useServerFeaturedStore()

await serverFeaturedStore.fetchServersFeatured()

const serversFeatured = computed(() => serverFeaturedStore.serversFeatured)
</script>

<template>
  <swiper-container
      :slides-per-view="1"
      :space-between="24"
      :breakpoints="{
        959: {
          slidesPerView: 2,
        },
        1279: {
          slidesPerView: 3,
        },
      }"
  >
    <swiper-slide>
      <ServerFeaturedItem :banner="serversFeatured[0]" />
    </swiper-slide>
    <swiper-slide>
      <ServerFeaturedItem :banner="serversFeatured[1]" />
    </swiper-slide>
    <swiper-slide>
      <ServerFeaturedItem :banner="serversFeatured[2]" />
    </swiper-slide>
  </swiper-container>
</template>