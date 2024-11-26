<template>
  <ServerList />
</template>

<script setup lang="ts">
const serverListStore = useServerListStore()
const serverFilterStore = useServerFilterStore()
const serverCategoryStore = useServerCategoryStore()

serverCategoryStore.initialize()

serverFilterStore.setPlatform('je')
serverFilterStore.setCategory(null)

serverListStore.initialize()

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