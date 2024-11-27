<template>
  <v-card rounded>
    <img src="https://www.minecraft.net/content/dam/games/minecraft/key-art/bedrock-header.jpg.transform/minecraft-image-large/image.jpg" />

    <v-card-text class="mb-n2">
      <ServerDetailTitle title="SlimeCraft" />
      <ServerDetailIp address="mc.slimecraft.net" />
    </v-card-text>
  </v-card>
</template>

<script setup>

</script>

<style scoped>
img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  vertical-align: middle;
}
</style>