export const useServerCategoryStore = defineStore('server/category', () => {
  const serverFilterStore = useServerFilterStore()

  const categories: Ref<IServerCategory[]> = ref([])

  const categoryDetail = computed(() => {
    return categories.value.find(c => c.slug === serverFilterStore.filters.category)
  })

  async function initialize() {
    const queryContentKey = `/server/categories`

    await useAsyncData(queryContentKey, async () => {
      const document = await queryContent(queryContentKey).findOne()

      setCategories(document.body)

      return true
    })
  }

  function setCategories(data: IServerCategory[]) {
    categories.value = data
  }

  function isCategoryValid(categorySlug: string) {
    return !!categories.value.find(category => category.slug === categorySlug)
  }

  return {
    categories,
    categoryDetail,
    initialize,
    isCategoryValid,
    setCategories,
  }
})