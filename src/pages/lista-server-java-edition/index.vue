<template>
  <ServerList />
</template>

<script setup lang="ts">
const serverListStore = useServerListStore()
const serverCategoryStore = useServerCategoryStore()
const serverFilterStore = useServerFilterStore()

await serverCategoryStore.initialize()
await serverListStore.fetchFromContent()

serverFilterStore.setPlatform('je')
serverFilterStore.setCategory(null)
serverFilterStore.setFavorite(false)

onMounted(async () => {
  await serverListStore.fetchPlayers()
})

useHead({
  title: 'Lista Server per Minecraft: Java Edition - Minecraft ITALIA',
  meta: [
      {
        name: `description`,
        content: 'La lista dei server per Minecraft: Java Edition attivi in Italia, trova un server e collegati al nostro Discord per creare una partita e giocare online con centinaia di giocatori',
      }
  ],
})
</script>