<template>
  <ServerList />
</template>

<script setup lang="ts">
const serverFilterStore = useServerFilterStore()

serverFilterStore.setPlatform(null)
serverFilterStore.setCategory(null)
serverFilterStore.setFavorite(true)

useHead({
  title: 'Lista Server per Minecraft: Preferiti - Minecraft ITALIA',
  meta: [
      {
        name: `description`,
        content: 'La lista dei server per Minecraft: Java Edition attivi in Italia, trova un server e collegati al nostro Discord per creare una partita e giocare online con centinaia di giocatori',
      }
  ],
})
</script>