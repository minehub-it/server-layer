<template>
  <ServerList />
</template>

<script setup lang="ts">
const serverFilterStore = useServerFilterStore()
const serverCategoryStore = useServerCategoryStore()

const categoryDetail = computed(() => serverCategoryStore.categoryDetail)
const route = useRoute()

serverFilterStore.setPlatform('je')
serverFilterStore.setCategory(String(route.params.category))

definePageMeta({
  validate: async (route) => {
    const { isCategoryValid } = useServerCategoryStore()
    return isCategoryValid(String(route.params.category))
  }
})

useHead({
  title: `Lista Server ${categoryDetail.name} per Minecraft: Java Edition`,
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