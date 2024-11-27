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
serverFilterStore.setFavorite(false)

definePageMeta({
  validate: serverCategoryRouteValidation
})

useHead({
  title: `Lista Server ${categoryDetail.value.name} per Minecraft: Java Edition`,
  meta: [
    {
      name: `description`,
      content: categoryDetail.value.description,
    }
  ],
})
</script>

<style scoped lang="scss">

</style>