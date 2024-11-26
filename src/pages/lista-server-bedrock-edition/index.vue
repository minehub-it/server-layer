<template>
  <ServerList />
</template>

<script setup lang="ts">
const serverFilterStore = useServerFilterStore()

serverFilterStore.setPlatform('be')
serverFilterStore.setCategory(null)

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