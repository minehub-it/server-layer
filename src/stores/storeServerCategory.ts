export const useServerCategoryStore = defineStore('server/category', () => {
  const storeServerList = useServerListStore()

  const categories: Ref<IServerCategory[]> = ref([])

  const categoryDetail = computed(() => {
    return categories.value.find(c => c.slug === storeServerList.filters.category)
  })

  async function initialize() {
    const queryContentKey = `/server-list/categories`

    await useAsyncData(queryContentKey, async () => {
      const document = await queryContent(queryContentKey).findOne()

      setCategories(document.body)
    })
  }

  function setCategories(data: IServerCategory[]) {
    categories.value = data
  }

  function isCategoryValid(categorySlug: string) {
    return !!categories.value.find(category => category.slug === categorySlug)
  }

  function categoriesNames(categoryKeys: string[]) {
    let categoriesNames: string[] = []

    if (categoryKeys && categoryKeys.length) {
      categoryKeys.map(categoryKey => {
        if (!categories.value) {
          return false
        }

        // aggiunge nome cat all'elenco dei nomi belli
        const categoryFound = categories.value.find(category => category.slug === categoryKey)

        if (categoryFound) {
          categoriesNames.push(categoryFound.name)
        }
      })
    }

    return categoriesNames
  }

  return {
    categories,
    categoryDetail,
    initialize,
    categoriesNames,
    isCategoryValid,
    setCategories,
  }
})