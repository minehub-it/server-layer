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
  title: 'Lista Server per Minecraft: Bedrock Edition - Minecraft ITALIA',
  meta: [
    {
      name: `description`,
      content: 'La lista dei server per Minecraft: Bedrock Edition attivi in Italia, trova server di gioco per Minecraft Windows 10 Edition, Xbox One, PlayStation 4 e Nintendo Switch',
    }
  ],
})
</script>