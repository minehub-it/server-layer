<template>
  <ServerList />
</template>

<script setup lang="ts">
const serverListStore = useServerListStore()
const serverFilterStore = useServerFilterStore()
const serverCategoryStore = useServerCategoryStore()

const categoryDetail = computed(() => serverCategoryStore.categoryDetail)
const route = useRoute()

serverCategoryStore.initialize()

serverFilterStore.setPlatform('be')
serverFilterStore.setCategory(String(route.params.category))

serverListStore.initialize()

definePageMeta({
  validate: async (route) => {
    const { isCategoryValid } = useServerCategoryStore()
    return isCategoryValid(String(route.params.category))
  }
})

useHead({
  title: `Lista Server ${categoryDetail.name} per Minecraft: Bedrock Edition`,
  meta: [
    {
      name: `description`,
      content: categoryDetail.description,
    }
  ],
})
</script>

<style scoped lang="scss">

</style>