<script setup lang="ts">
withDefaults(defineProps<{
  banner: IServerBanner
}>(), {
  banner: {
    image: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/bedrock-header.jpg.transform/minecraft-image-large/image.jpg',
    title: 'Server Minecraft in evidenza',
    subtitle: 'riservato ai server owner Premium',
    link: 'https://patreon.com/checkout/minecraftit?rid=7876947'
  }
})
</script>

<template>
  <a :href="banner.link" target="_blank">
    <v-card rounded>
      <img :src="banner.image" />

      <v-card-text class="mx-2 mb-n1">
        <ServerDetailTitle :title="banner.title" />
        <ServerDetailIp :address="banner.subtitle" />
      </v-card-text>
    </v-card>
  </a>
</template>

<style scoped>
img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  vertical-align: middle;
}
</style>